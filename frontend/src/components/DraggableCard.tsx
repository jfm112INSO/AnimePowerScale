'use client'

import { useDrag } from 'react-dnd'
import CharacterCard from '@/components/CharacterCard'

// Tipo local de personaje
type Personaje = {
  nombre: string
  tier: string
  imagen_url: string
}

const ItemTypes = {
  PERSONAJE: 'personaje',
}

export default function DraggableCard({
  personaje,
  onDragEnd,
}: {
  personaje: Personaje
  onDragEnd?: () => void
}) {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.PERSONAJE,
      item: personaje,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const didDrop = monitor.didDrop()
        if (didDrop && onDragEnd) {
          onDragEnd()
        }
      },
    }),
    [personaje, onDragEnd]
  )

  return (
    <div
      ref={drag}
      className={`w-60 h-60 cursor-grab ${isDragging ? 'opacity-50' : ''}`}
    >
      <CharacterCard personaje={personaje} />
    </div>
  )  
}