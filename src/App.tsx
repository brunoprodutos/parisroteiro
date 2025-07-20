import React, { useState } from 'react';
import { MapPin, Clock, Star, Camera, Coffee, Utensils } from 'lucide-react';

interface ItineraryItem {
  id: number;
  time: string;
  title: string;
  description: string;
  location: string;
  type: 'attraction' | 'restaurant' | 'cafe' | 'activity';
  rating: number;
  duration: string;
  tips?: string;
}

const parisItinerary: ItineraryItem[] = [
  {
    id: 1,
    time: "09:00",
    title: "Torre Eiffel",
    description: "Comece o dia visitando o símbolo mais icônico de Paris. Suba até o segundo andar para vistas espetaculares da cidade.",
    location: "Champ de Mars, 5 Avenue Anatole France",
    type: "attraction",
    rating: 4.8,
    duration: "2h",
    tips: "Compre ingressos online para evitar filas. Melhor vista ao nascer do sol!"
  },
  {
    id: 2,
    time: "11:30",
    title: "Café de Flore",
    description: "Pause para um café autêntico parisiense neste café histórico frequentado por intelectuais famosos.",
    location: "172 Boulevard Saint-Germain",
    type: "cafe",
    rating: 4.5,
    duration: "45min",
    tips: "Experimente o croissant com café au lait"
  },
  {
    id: 3,
    time: "13:00",
    title: "Museu do Louvre",
    description: "Explore a maior coleção de arte do mundo, incluindo a Mona Lisa e a Vênus de Milo.",
    location: "Rue de Rivoli",
    type: "attraction",
    rating: 4.9,
    duration: "3h",
    tips: "Reserve pelo menos 3 horas. Use o app oficial para navegar melhor."
  },
  {
    id: 4,
    time: "16:30",
    title: "Jardins de Luxemburgo",
    description: "Relaxe nos belos jardins franceses, perfeitos para uma caminhada tranquila.",
    location: "6ème arrondissement",
    type: "activity",
    rating: 4.7,
    duration: "1h30",
    tips: "Ótimo local para fotos e piquenique"
  },
  {
    id: 5,
    time: "19:00",
    title: "Le Comptoir du Relais",
    description: "Jantar em uma autêntica bistrot parisiense com pratos tradicionais franceses.",
    location: "9 Carrefour de l'Odéon",
    type: "restaurant",
    rating: 4.6,
    duration: "2h",
    tips: "Reserva essencial. Experimente o coq au vin!"
  }
];

function App() {
  const [selectedItem, setSelectedItem] = useState<ItineraryItem | null>(parisItinerary[0]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'attraction': return <MapPin className="w-5 h-5" />;
      case 'restaurant': return <Utensils className="w-5 h-5" />;
      case 'cafe': return <Coffee className="w-5 h-5" />;
      case 'activity': return <Camera className="w-5 h-5" />;
      default: return <MapPin className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'attraction': return 'bg-blue-100 text-blue-800';
      case 'restaurant': return 'bg-red-100 text-red-800';
      case 'cafe': return 'bg-amber-100 text-amber-800';
      case 'activity': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-3">
            <MapPin className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Roteiro Paris</h1>
              <p className="text-sm text-gray-600">Seu guia completo para um dia perfeito em Paris</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
          {/* Lista do Roteiro */}
          <div className="space-y-3 lg:space-y-4">
            <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4 lg:mb-6">Cronograma do Dia</h2>
            
            {parisItinerary.map((item, index) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={`bg-white rounded-lg shadow-sm border-2 transition-all duration-200 cursor-pointer hover:shadow-md ${
                  selectedItem?.id === item.id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="p-4 lg:p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold text-sm">{item.time}</span>
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                          {getIcon(item.type)}
                          <span className="ml-1 capitalize hidden sm:inline">{item.type}</span>
                        </div>
                        <div className="flex items-center space-x-1 flex-shrink-0">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600">{item.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1 flex-shrink-0">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{item.duration}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-xs lg:text-sm text-gray-600 mb-2 truncate">{item.location}</p>
                      <p className="text-gray-700 text-sm line-clamp-2">{item.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Detalhes do Item Selecionado */}
          <div className="xl:sticky xl:top-8">
            {selectedItem && (
              <div className="bg-white rounded-lg shadow-lg border border-gray-200">
                <div className="p-4 lg:p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 lg:w-16 lg:h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <div className="text-blue-600">
                        {getIcon(selectedItem.type)}
                      </div>
                    </div>
                    <div>
                      <h2 className="text-xl lg:text-2xl font-bold text-gray-900">{selectedItem.title}</h2>
                      <p className="text-sm lg:text-base text-gray-600">{selectedItem.time} • {selectedItem.duration}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xs lg:text-sm font-semibold text-gray-900 uppercase tracking-wide mb-2">Descrição</h3>
                      <p className="text-sm lg:text-base text-gray-700 leading-relaxed">{selectedItem.description}</p>
                    </div>

                    <div>
                      <h3 className="text-xs lg:text-sm font-semibold text-gray-900 uppercase tracking-wide mb-2">Localização</h3>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <p className="text-sm lg:text-base text-gray-700">{selectedItem.location}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 lg:flex lg:items-center lg:space-x-6">
                      <div>
                        <h3 className="text-xs lg:text-sm font-semibold text-gray-900 uppercase tracking-wide mb-1">Avaliação</h3>
                        <div className="flex items-center space-x-1">
                          <Star className="w-5 h-5 text-yellow-400 fill-current" />
                          <span className="text-base lg:text-lg font-semibold text-gray-900">{selectedItem.rating}</span>
                          <span className="text-sm lg:text-base text-gray-600">/5.0</span>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-xs lg:text-sm font-semibold text-gray-900 uppercase tracking-wide mb-1">Duração</h3>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-5 h-5 text-gray-400" />
                          <span className="text-base lg:text-lg font-semibold text-gray-900">{selectedItem.duration}</span>
                        </div>
                      </div>
                    </div>

                    {selectedItem.tips && (
                      <div className="bg-blue-50 rounded-lg p-4">
                        <h3 className="text-xs lg:text-sm font-semibold text-blue-900 mb-2">💡 Dica Especial</h3>
                        <p className="text-blue-800 text-sm">{selectedItem.tips}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;