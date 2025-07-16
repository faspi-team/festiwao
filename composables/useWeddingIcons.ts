export const useWeddingIcons = () => {
  const predefinedIcons = [
    { id: 'menorah', icon: 'fas fa-menorah', label: 'Cena' },
    { id: 'photo-video', icon: 'fas fa-photo-video', label: 'Sesión de fotos' },
    { id: 'dungeon', icon: 'fas fa-dungeon', label: 'Recepción' },
    { id: 'ring', icon: 'fas fa-ring', label: 'Ceremonia' },
    { id: 'glass-cheers', icon: 'fas fa-glass-cheers', label: 'Brindis' },
    { id: 'music', icon: 'fas fa-music', label: 'Música' },
    { id: 'utensils', icon: 'fas fa-utensils', label: 'Banquete' },
    { id: 'heart', icon: 'fas fa-heart', label: 'Votos' },
    { id: 'church', icon: 'fas fa-church', label: 'Iglesia' },
    { id: 'car', icon: 'fas fa-car', label: 'Transporte' },
    { id: 'gift', icon: 'fas fa-gift', label: 'Regalos' },
    { id: 'birthday-cake', icon: 'fas fa-birthday-cake', label: 'Pastel' },
    { id: 'microphone', icon: 'fas fa-microphone', label: 'Discursos' },
    { id: 'dancing', icon: 'fas fa-user-friends', label: 'Baile' },
    { id: 'flower', icon: 'fas fa-seedling', label: 'Flores' },
    { id: 'champagne', icon: 'fas fa-wine-bottle', label: 'Champagne' }
  ]

  const getIconByName = (iconName: string) => {
    return predefinedIcons.find(icon => icon.id === iconName) || predefinedIcons[0]
  }

  return {
    predefinedIcons,
    getIconByName
  }
} 