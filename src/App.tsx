import React, { useState } from 'react';
import { MapPin, Clock, Star, Camera, Coffee, Utensils, Info, X, ExternalLink } from 'lucide-react';

interface ItineraryItem {
  id: number;
  day: number;
  time: string;
  title: string;
  description: string;
  location: string;
  type: 'attraction' | 'restaurant' | 'cafe' | 'activity';
  rating: number;
  duration: string;
  tips?: string;
  observation?: string;
  reservationStatus?: 'available' | 'reserved';
  ticketLink?: string;
  detailedInfo?: string;
}

const parisItinerary: ItineraryItem[] = [
  {
    id: 1,
    day: 1,
    time: "09:00",
    title: "Torre Eiffel",
    description: "Comece o dia visitando o símbolo mais icônico de Paris. Suba até o segundo andar para vistas espetaculares da cidade.",
    location: "Champ de Mars, 5 Avenue Anatole France",
    type: "attraction",
    rating: 4.8,
    duration: "2h",
    tips: "Compre ingressos online para evitar filas. Melhor vista ao nascer do sol!",
    detailedInfo: "Metrô: Bir-Hakeim (Linha 6), Trocadéro (Linhas 6, 9). Caminhe ao redor da base da torre. Jardins do Champ de Mars são gratuitos. Várias perspectivas para fotos únicas."
  },
  {
    id: 2,
    day: 1,
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
    day: 1,
    time: "13:00",
    title: "Museu do Louvre",
    description: "Explore a maior coleção de arte do mundo, incluindo a Mona Lisa e a Vênus de Milo.",
    location: "Rue de Rivoli",
    type: "attraction",
    rating: 4.9,
    duration: "3h",
    tips: "Reserve pelo menos 3 horas. Use o app oficial para navegar melhor.",
    reservationStatus: "reserved",
    ticketLink: "https://drive.google.com/file/d/1z-F45CxWtR0xPrckcKOe8RU4NM-8IcrF",
    detailedInfo: "Entrada: Carrossel (Metrô Palais Royal, saída 6). Ingresso: €22 (reserva obrigatória). Roteiro: 09h-11h Ala Denon (Mona Lisa, Vênus de Milo), 11h-11h30 PAUSA, 11h30-13h Ala Sully (Antiguidades Egípcias), 13h-14h ALMOÇO, 14h-15h30 Ala Richelieu. Máximo 1h30 seguidas caminhando. Use mapas offline do app Louvre."
  },
  {
    id: 4,
    day: 2,
    time: "10:00",
    title: "Arco do Triunfo",
    description: "Monumento histórico no centro da Place Charles de Gaulle, oferece vista panorâmica dos Champs-Élysées.",
    location: "Place Charles de Gaulle",
    type: "attraction",
    rating: 4.6,
    duration: "1h30",
    tips: "Suba até o topo para vista dos 12 boulevards que se irradiam da praça",
    reservationStatus: "reserved",
    ticketLink: "https://drive.google.com/file/d/1MJTDIDxm8mX4AHGCTBoHYIepEGK67K5Z"
  },
  {
    id: 5,
    day: 2,
    time: "14:00",
    title: "Museu d'Orsay",
    description: "Museu com a maior coleção de obras impressionistas do mundo, incluindo Monet, Renoir e Van Gogh.",
    location: "1 Rue de la Légion d'Honneur",
    type: "attraction",
    rating: 4.7,
    duration: "2h30",
    tips: "Não perca as obras de Monet no último andar",
    reservationStatus: "reserved",
    ticketLink: "https://drive.google.com/file/d/14zTpXsrO_IslJtSDuYcJ9rU1nWUtOvU4",
    detailedInfo: "Metrô: Solférino (Linha 12). Ingresso: €16 (€8,50 quintas após 18h). Roteiro 3h: 10h30-11h30 Térreo (Realismo, Escola de Barbizon), 11h30-12h30 5º Andar (IMPRESSIONISTAS - essencial), 12h30-13h30 2º Andar (Pós-Impressionistas, Rodin). Obras Imperdíveis: Manet: 'Olympia', 'Almoço na Relva'; Monet: Série 'Catedrais de Rouen'; Renoir: 'Baile no Moulin de la Galette'; Van Gogh: 'Noite Estrelada sobre o Ródano'; Cézanne: 'Montanha Sainte-Victoire'. Dica: Se cansado, vá direto ao 5º andar!"
  },
  {
    id: 6,
    day: 3,
    time: "09:30",
    title: "Palácio de Versalhes",
    description: "Majestoso palácio real com jardins espetaculares, símbolo do poder absoluto francês.",
    location: "Place d'Armes, Versailles",
    type: "attraction",
    rating: 4.8,
    duration: "4h",
    tips: "Reserve o dia inteiro. Comece pelos apartamentos reais",
    reservationStatus: "reserved",
    ticketLink: "https://drive.google.com/file/d/1Npk5RiAgjPjpTnC11aF3c-4N1sLsGPYg",
    detailedInfo: "Acesso: RER C até Versailles Château Rive Gauche. Ingresso: Passport €32 (Jardins Musicais inclusos). Petit Train: €9 (circuito completo). Roteiro 5h30: 09h-11h30 Palácio (Galeria dos Espelhos, Aposentos Reais), 11h30-12h Jardins principais (a pé), 12h-13h Petit Train (Trianons + Canal), 13h-14h Almoço no local, 14h-14h30 Jardins Musicais (fontes funcionando). Reserve online obrigatório. Chegue 15min antes do horário."
  },
  {
    id: 7,
    day: 3,
    time: "16:00",
    title: "Panthéon",
    description: "Mausoléu neoclássico onde repousam grandes personalidades francesas como Voltaire e Marie Curie.",
    location: "Place du Panthéon",
    type: "attraction",
    rating: 4.5,
    duration: "1h30",
    tips: "Visite a cripta para ver os túmulos dos grandes franceses",
    reservationStatus: "reserved",
    ticketLink: "https://drive.google.com/file/d/1by3ezpwZE6WDh-8NXQ9ARldkIEfBoIOc"
  },
  {
    id: 8,
    day: 4,
    time: "10:00",
    title: "Ópera Garnier",
    description: "Magnífica ópera do século XIX, inspiração para 'O Fantasma da Ópera'.",
    location: "Place de l'Opéra",
    type: "attraction",
    rating: 4.7,
    duration: "1h30",
    tips: "Visite o foyer e a escadaria principal",
    observation: "Reservar com 1 mês de antecedência"
  },
  {
    id: 9,
    day: 4,
    time: "17:00",
    title: "Galeria Lafayette",
    description: "Galeria Lafayette para pôr do sol - vista espetacular do terraço.",
    location: "40 Boulevard Haussmann",
    type: "activity",
    rating: 4.4,
    duration: "1h",
    tips: "Acesso gratuito ao terraço, melhor horário para pôr do sol"
  },
  {
    id: 10,
    day: 5,
    time: "10:00",
    title: "Catedral Notre-Dame",
    description: "Obra-prima da arquitetura gótica francesa, atualmente em restauração.",
    location: "6 Parvis Notre-Dame",
    type: "attraction",
    rating: 4.6,
    duration: "1h30",
    tips: "Visite também a Sainte-Chapelle próxima",
    observation: "Reservar interior 2 dias antes"
  },
  {
    id: 11,
    day: 5,
    time: "20:00",
    title: "Cruzeiro Noturno no Rio Sena",
    description: "Passeio romântico pelo Sena com vista iluminada dos monumentos parisienses.",
    location: "Port de la Bourdonnais",
    type: "activity",
    rating: 4.5,
    duration: "1h15",
    tips: "Vista única da Torre Eiffel iluminada",
    observation: "Flexível",
    reservationStatus: "reserved",
    ticketLink: "https://drive.google.com/file/d/1ArYihq434bXL8_nhb4ACVRTRwCgpJUis"
  },
  {
    id: 12,
    day: 6,
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
    id: 13,
    day: 6,
    time: "18:00",
    title: "Restaurante Comme un Bouillon",
    description: "Jantar no Restaurante Comme un Bouillon - autêntica cozinha francesa em ambiente tradicional.",
    location: "10 Rue Racine",
    type: "restaurant",
    rating: 4.3,
    duration: "2h",
    tips: "Experimente o menu degustação com vinhos franceses"
  }
];

function App() {
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalItem, setModalItem] = useState<ItineraryItem | null>(null);

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

  const filteredItinerary = parisItinerary.filter(item => item.day === selectedDay);
  const totalDays = Math.max(...parisItinerary.map(item => item.day));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">🗼 Roteiro Paris 2025</h1>
            <p className="text-gray-600">Seu guia completo para uma viagem perfeita em Paris</p>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navegação por Dias */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2 bg-white rounded-full p-2 shadow-lg">
            {Array.from({length: totalDays}, (_, i) => i + 1).map(day => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedDay === day 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Dia {day}
              </button>
            ))}
          </div>
        </div>

        {/* Lista de Atividades */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
            <h2 className="text-xl font-semibold">Cronograma - Dia {selectedDay}</h2>
          </div>
          
          <div className="divide-y divide-gray-100">
            {filteredItinerary.map((item, index) => (
              <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <input 
                    type="checkbox" 
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold text-sm">{item.time}</span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(item.type)}`}>
                        {getIcon(item.type)}
                        <span className="ml-2">{item.title}</span>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{item.rating}</span>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{item.duration}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-1">{item.location}</p>
                    <p className="text-gray-700 mb-3">{item.description}</p>
                    
                    <div className="flex items-center space-x-3">
                      {item.tips && (
                        <div className="bg-blue-50 px-3 py-1 rounded-full">
                          <span className="text-blue-700 text-sm">💡 {item.tips}</span>
                        </div>
                      )}
                      
                      {item.observation && (
                        <div className="bg-amber-50 px-3 py-1 rounded-full">
                          <span className="text-amber-700 text-sm">⚠️ {item.observation}</span>
                        </div>
                      )}
                      
                      {item.detailedInfo && (
                        <button
                          onClick={() => {
                            setModalItem(item);
                            setShowModal(true);
                          }}
                          className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full hover:bg-blue-700 transition-colors"
                        >
                          Info
                        </button>
                      )}
                      
                      {item.reservationStatus === 'reserved' && item.ticketLink && (
                        <a
                          href={item.ticketLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full hover:bg-green-200 transition-colors text-sm"
                        >
                          ✓ Reservado
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal de Informações Detalhadas */}
      {showModal && modalItem?.detailedInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">{modalItem.title} - Informações Detalhadas</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                {modalItem.detailedInfo}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;