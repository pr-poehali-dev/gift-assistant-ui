import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

type Step = 'occasion' | 'recipient' | 'details' | 'results';

interface GiftSuggestion {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  reason: string;
}

const Index = () => {
  const [activeNav, setActiveNav] = useState('home');
  const [currentStep, setCurrentStep] = useState<Step>('occasion');
  const [selectedOccasion, setSelectedOccasion] = useState('');
  const [selectedRecipient, setSelectedRecipient] = useState('');
  const [selectedAge, setSelectedAge] = useState('');
  const [budget, setBudget] = useState([5000]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [giftSuggestions, setGiftSuggestions] = useState<GiftSuggestion[]>([]);

  const occasions = [
    { id: 'birthday', label: 'День рождения', icon: 'Cake', gradient: 'from-pink-400 to-rose-500' },
    { id: 'newyear', label: 'Новый год', icon: 'Sparkles', gradient: 'from-blue-400 to-cyan-500' },
    { id: 'wedding', label: 'Свадьба', icon: 'Heart', gradient: 'from-rose-400 to-pink-500' },
    { id: 'anniversary', label: 'Годовщина', icon: 'Gift', gradient: 'from-purple-400 to-indigo-500' },
    { id: 'mothers-day', label: 'День матери', icon: 'Heart', gradient: 'from-rose-300 to-pink-400' },
    { id: 'fathers-day', label: 'День отца', icon: 'Star', gradient: 'from-blue-500 to-indigo-600' }
  ];

  const recipients = [
    { id: 'mom', label: 'Мама', icon: '👩', gradient: 'from-rose-300 to-pink-400' },
    { id: 'dad', label: 'Папа', icon: '👨', gradient: 'from-blue-400 to-indigo-500' },
    { id: 'wife', label: 'Жена', icon: '💝', gradient: 'from-pink-400 to-rose-500' },
    { id: 'husband', label: 'Муж', icon: '💙', gradient: 'from-blue-500 to-cyan-600' },
    { id: 'son', label: 'Сын', icon: '👦', gradient: 'from-cyan-400 to-blue-500' },
    { id: 'daughter', label: 'Дочь', icon: '👧', gradient: 'from-pink-300 to-rose-400' },
    { id: 'friend', label: 'Друг', icon: '🤝', gradient: 'from-purple-400 to-pink-500' },
    { id: 'colleague', label: 'Коллега', icon: '💼', gradient: 'from-gray-400 to-slate-500' }
  ];

  const ageGroups = [
    { id: '0-12', label: '0-12 лет' },
    { id: '13-17', label: '13-17 лет' },
    { id: '18-25', label: '18-25 лет' },
    { id: '26-35', label: '26-35 лет' },
    { id: '36-50', label: '36-50 лет' },
    { id: '50+', label: '50+ лет' }
  ];

  const generateGifts = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const mockGifts: GiftSuggestion[] = [
        {
          id: 1,
          name: 'Умные часы премиум класса',
          description: 'Стильные умные часы с функциями здоровья и фитнеса',
          price: `${budget[0].toLocaleString('ru-RU')}₽`,
          image: '⌚',
          reason: 'Идеально для современного человека, следящего за здоровьем'
        },
        {
          id: 2,
          name: 'Набор премиальной косметики',
          description: 'Эксклюзивный набор от известного бренда',
          price: `${Math.round(budget[0] * 0.8).toLocaleString('ru-RU')}₽`,
          image: '💄',
          reason: 'Роскошный подарок для особого случая'
        },
        {
          id: 3,
          name: 'Беспроводные наушники',
          description: 'Премиальный звук и шумоподавление',
          price: `${Math.round(budget[0] * 0.9).toLocaleString('ru-RU')}₽`,
          image: '🎧',
          reason: 'Для любителей музыки и технологий'
        }
      ];
      setGiftSuggestions(mockGifts);
      setIsGenerating(false);
      setCurrentStep('results');
    }, 2000);
  };

  const handleOccasionSelect = (id: string) => {
    setSelectedOccasion(id);
    setTimeout(() => setCurrentStep('recipient'), 300);
  };

  const handleRecipientSelect = (id: string) => {
    setSelectedRecipient(id);
    setTimeout(() => setCurrentStep('details'), 300);
  };

  const handleBack = () => {
    if (currentStep === 'recipient') setCurrentStep('occasion');
    if (currentStep === 'details') setCurrentStep('recipient');
    if (currentStep === 'results') setCurrentStep('details');
  };

  const resetFlow = () => {
    setCurrentStep('occasion');
    setSelectedOccasion('');
    setSelectedRecipient('');
    setSelectedAge('');
    setBudget([5000]);
    setGiftSuggestions([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-500 to-cyan-400 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-white/10 via-transparent to-black/20 pointer-events-none" />
      <div className="absolute top-20 left-10 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-40 right-10 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 max-w-md mx-auto min-h-screen flex flex-col pb-20">
        <header className="pt-12 pb-6 px-6 flex items-center justify-between">
          {currentStep !== 'occasion' ? (
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
              onClick={handleBack}
            >
              <Icon name="ArrowLeft" size={24} />
            </Button>
          ) : (
            <Button variant="ghost" size="icon" className="rounded-full bg-white/20 backdrop-blur-sm text-white">
              <Icon name="Menu" size={24} />
            </Button>
          )}
          <Button variant="ghost" size="icon" className="rounded-full bg-white/20 backdrop-blur-sm text-white">
            <Icon name="User" size={24} />
          </Button>
        </header>

        {currentStep === 'occasion' && (
          <div className="px-6 flex-1 flex flex-col justify-center animate-fade-in">
            <h1 className="text-3xl font-bold text-white text-center mb-3">
              По какому поводу?
            </h1>
            <p className="text-white/80 text-center mb-8">Выберите событие</p>
            
            <div className="grid grid-cols-2 gap-4">
              {occasions.map((occasion, idx) => (
                <Card
                  key={occasion.id}
                  onClick={() => handleOccasionSelect(occasion.id)}
                  className={`p-6 cursor-pointer border-0 bg-gradient-to-br ${occasion.gradient} hover:scale-105 transition-all animate-scale-in`}
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <Icon name={occasion.icon} size={32} className="text-white" />
                    </div>
                    <span className="text-white font-semibold text-center">{occasion.label}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {currentStep === 'recipient' && (
          <div className="px-6 flex-1 flex flex-col justify-center animate-fade-in">
            <h1 className="text-3xl font-bold text-white text-center mb-3">
              Кому подарок?
            </h1>
            <p className="text-white/80 text-center mb-8">Выберите получателя</p>
            
            <div className="grid grid-cols-2 gap-4">
              {recipients.map((recipient, idx) => (
                <Card
                  key={recipient.id}
                  onClick={() => handleRecipientSelect(recipient.id)}
                  className={`p-6 cursor-pointer border-0 bg-gradient-to-br ${recipient.gradient} hover:scale-105 transition-all animate-scale-in`}
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="text-4xl">{recipient.icon}</div>
                    <span className="text-white font-semibold text-center">{recipient.label}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {currentStep === 'details' && (
          <div className="px-6 flex-1 flex flex-col justify-center animate-fade-in">
            <h1 className="text-3xl font-bold text-white text-center mb-8">
              Уточните детали
            </h1>
            
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-6 space-y-8">
              <div>
                <Label className="text-white font-semibold mb-4 block text-lg">Возраст</Label>
                <div className="grid grid-cols-3 gap-3">
                  {ageGroups.map((age) => (
                    <Button
                      key={age.id}
                      variant={selectedAge === age.id ? 'default' : 'outline'}
                      onClick={() => setSelectedAge(age.id)}
                      className={`rounded-xl py-6 transition-all ${
                        selectedAge === age.id
                          ? 'bg-white text-purple-600 hover:bg-white/90'
                          : 'bg-white/20 text-white border-white/30 hover:bg-white/30'
                      }`}
                    >
                      {age.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-white font-semibold mb-4 block text-lg">
                  Бюджет: до {budget[0].toLocaleString('ru-RU')}₽
                </Label>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <Slider 
                    value={budget} 
                    onValueChange={setBudget}
                    max={50000}
                    step={1000}
                    className="mb-3"
                  />
                  <div className="flex justify-between text-sm text-white/80">
                    <span>1 000₽</span>
                    <span>50 000₽</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={generateGifts}
                disabled={!selectedAge}
                className="w-full py-7 bg-white text-purple-600 hover:bg-white/90 font-bold text-lg rounded-2xl disabled:opacity-50"
              >
                <Icon name="Sparkles" size={24} className="mr-2" />
                Подобрать подарки
              </Button>
            </div>
          </div>
        )}

        {currentStep === 'results' && (
          <div className="px-6 flex-1 animate-fade-in pb-6">
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="w-20 h-20 border-4 border-white/30 border-t-white rounded-full animate-spin mb-4" />
                <p className="text-white text-lg">Подбираю идеальные подарки...</p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-white mb-2">Подарки подобраны! 🎁</h1>
                  <p className="text-white/80">ИИ выбрал лучшие варианты для вас</p>
                </div>

                <div className="space-y-4 mb-20">
                  {giftSuggestions.map((gift, idx) => (
                    <Card
                      key={gift.id}
                      className="border-0 bg-white/95 backdrop-blur-sm overflow-hidden animate-scale-in"
                      style={{ animationDelay: `${idx * 0.1}s` }}
                    >
                      <div className="flex gap-4 p-4">
                        <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center text-5xl flex-shrink-0">
                          {gift.image}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 mb-1">{gift.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">{gift.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-purple-600 font-bold text-lg">{gift.price}</span>
                            <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full">
                              Подробнее
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-4 py-3 border-t">
                        <p className="text-xs text-gray-600">💡 {gift.reason}</p>
                      </div>
                    </Card>
                  ))}
                </div>

                <div className="fixed bottom-20 left-0 right-0 px-6 max-w-md mx-auto">
                  <Button
                    onClick={resetFlow}
                    className="w-full py-6 bg-white/20 backdrop-blur-lg text-white hover:bg-white/30 font-semibold rounded-2xl border-2 border-white/30"
                  >
                    <Icon name="RotateCcw" size={20} className="mr-2" />
                    Подобрать другой подарок
                  </Button>
                </div>
              </>
            )}
          </div>
        )}

        <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-lg">
          <div className="max-w-md mx-auto flex justify-around py-3">
            {[
              { id: 'home', icon: 'Home', label: 'Главная' },
              { id: 'favorites', icon: 'Heart', label: 'Избранное' },
              { id: 'profile', icon: 'User', label: 'Профиль' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`flex flex-col items-center gap-1 px-6 py-2 transition-all ${
                  activeNav === item.id ? 'text-rose-500' : 'text-gray-400'
                }`}
              >
                <Icon name={item.icon} size={24} />
                <span className="text-xs">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Index;