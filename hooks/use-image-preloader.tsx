"use client"

import { useState, useEffect, useCallback, useRef } from "react"

interface UseImagePreloaderProps {
  images: string[]
  onProgress?: (loaded: number, total: number) => void
}

// Cache global para imágenes ya cargadas
const imageCache = new Set<string>()
const loadingPromises = new Map<string, Promise<void>>()

export function useImagePreloader({ images, onProgress }: UseImagePreloaderProps) {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set(imageCache))
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const hasInitialized = useRef(false)
  const currentImages = useRef<string[]>([])

  const loadImage = useCallback((src: string): Promise<void> => {
    // Si ya está en caché, resolver inmediatamente
    if (imageCache.has(src)) {
      return Promise.resolve()
    }

    // Si ya está siendo cargada, retornar la promesa existente
    if (loadingPromises.has(src)) {
      return loadingPromises.get(src)!
    }

    // Crear nueva promesa de carga
    const loadPromise = new Promise<void>((resolve) => {
      const img = new Image()

      const handleLoad = () => {
        imageCache.add(src)
        setLoadedImages((prev) => new Set([...prev, src]))
        loadingPromises.delete(src)
        resolve()
      }

      const handleError = () => {
        console.warn(`Failed to load image: ${src}`)
        // Aún así marcamos como "cargada" para evitar intentos infinitos
        imageCache.add(src)
        setLoadedImages((prev) => new Set([...prev, src]))
        loadingPromises.delete(src)
        resolve()
      }

      img.onload = handleLoad
      img.onerror = handleError

      // Configurar crossOrigin para evitar problemas CORS
      if (src.startsWith("http")) {
        img.crossOrigin = "anonymous"
      }

      img.src = src
    })

    loadingPromises.set(src, loadPromise)
    return loadPromise
  }, [])

  useEffect(() => {
    // Evitar re-inicialización si las imágenes no han cambiado
    const imagesString = JSON.stringify(images.sort())
    const currentImagesString = JSON.stringify(currentImages.current.sort())

    if (hasInitialized.current && imagesString === currentImagesString) {
      return
    }

    currentImages.current = [...images]
    hasInitialized.current = true

    if (images.length === 0) {
      setIsLoading(false)
      setProgress(100)
      return
    }

    // Filtrar imágenes que ya están en caché
    const uncachedImages = images.filter((src) => !imageCache.has(src))

    if (uncachedImages.length === 0) {
      // Todas las imágenes ya están cargadas
      setProgress(100)
      setIsLoading(false)
      onProgress?.(images.length, images.length)
      return
    }

    let loadedCount = images.length - uncachedImages.length // Contar las ya cargadas
    const totalImages = images.length

    // Actualizar progreso inicial
    const initialProgress = Math.round((loadedCount / totalImages) * 100)
    setProgress(initialProgress)
    onProgress?.(loadedCount, totalImages)

    const loadAllImages = async () => {
      try {
        // Cargar imágenes en lotes para mejor performance
        const batchSize = 5
        for (let i = 0; i < uncachedImages.length; i += batchSize) {
          const batch = uncachedImages.slice(i, i + batchSize)

          await Promise.all(
            batch.map(async (src) => {
              await loadImage(src)
              loadedCount++
              const currentProgress = Math.round((loadedCount / totalImages) * 100)
              setProgress(currentProgress)
              onProgress?.(loadedCount, totalImages)
            }),
          )
        }
      } catch (error) {
        console.error("Error loading images:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadAllImages()
  }, [images, loadImage, onProgress])

  // Limpiar promesas pendientes al desmontar
  useEffect(() => {
    return () => {
      loadingPromises.clear()
    }
  }, [])

  return {
    isLoading,
    progress,
    loadedImages,
    isImageLoaded: useCallback((src: string) => imageCache.has(src), []),
    totalCached: imageCache.size,
  }
}

// Hook para limpiar caché si es necesario
export function useClearImageCache() {
  return useCallback(() => {
    imageCache.clear()
    loadingPromises.clear()
  }, [])
}
