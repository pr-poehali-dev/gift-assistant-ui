import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const Index = () => {
  const [activeNav, setActiveNav] = useState('home');
  const [budget, setBudget] = useState([3000]);
  const [gender, setGender] = useState('all');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedAge, setSelectedAge] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const quickFilters = [
    { label: 'День рождения', icon: 'Cake' },
    { label: 'Новый год', icon: 'Sparkles' },
    { label: 'Мама', icon: 'Heart' },
    { label: 'Папа', icon: 'Star' },
    { label: 'До 3000₽', icon: 'Banknote' }
  ];

  const gifts = [
    { id: 1, name: 'Ароматическая свеча', price: '1500₽', category: 'Декор', image: '🕯️' },
    { id: 2, name: 'Беспроводные наушники', price: '4500₽', category: 'Техника', image: '🎧' },
    { id: 3, name: 'Книга-бестселлер', price: '850₽', category: 'Книги', image: '📚' },
    { id: 4, name: 'Термокружка', price: '1200₽', category: 'Аксессуары', image: '☕' },
    { id: 5, name: 'Набор косметики', price: '2800₽', category: 'Красота', image: '💄' },
    { id: 6, name: 'Умные часы', price: '8900₽', category: 'Техника', image: '⌚' }
  ];

  const interests = [
    'Спорт', 'Книги', 'Музыка', 'Кулинария', 
    'Путешествия', 'Технологии', 'Искусство', 'Мода'
  ];

  const ageGroups = ['0-12', '13-17', '18-25', '26-35', '36-50', '50+'];

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    );
  };

  const toggleAge = (age: string) => {
    setSelectedAge(prev => 
      prev.includes(age) ? prev.filter(a => a !== age) : [...prev, age]
    );
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-mint-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-rose-100/30 via-transparent to-mint-100/30 pointer-events-none" />
      <div className="absolute top-20 left-10 w-64 h-64 bg-rose-200/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-40 right-10 w-80 h-80 bg-mint-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 max-w-md mx-auto min-h-screen flex flex-col pb-20">
        <header className="pt-12 pb-6 px-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Подарки</h1>
            <p className="text-sm text-gray-500">Найди идеальный подарок</p>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Icon name="User" size={24} />
          </Button>
        </header>

        <div className="px-6 mb-6 animate-fade-in">
          <div className="relative">
            <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="Искать подарок..." 
              className="pl-12 pr-4 py-6 bg-white/80 backdrop-blur-lg border-gray-200 rounded-2xl shadow-sm focus:shadow-md transition-all"
            />
          </div>
        </div>

        <div className="px-6 mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {quickFilters.map((filter, idx) => (
              <Badge 
                key={idx}
                variant="secondary" 
                className="flex items-center gap-1.5 px-4 py-2.5 bg-white/80 backdrop-blur-sm hover:bg-rose-100/80 cursor-pointer transition-all hover:scale-105 whitespace-nowrap rounded-full border border-gray-200"
              >
                <Icon name={filter.icon} size={16} />
                <span className="text-sm">{filter.label}</span>
              </Badge>
            ))}
          </div>
        </div>

        <div className="px-6 mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full justify-between bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-mint-50/80 rounded-xl py-6"
              >
                <span className="flex items-center gap-2">
                  <Icon name="SlidersHorizontal" size={20} />
                  <span>Расширенные фильтры</span>
                </span>
                <Icon name="ChevronRight" size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh] rounded-t-3xl">
              <SheetHeader className="mb-6">
                <SheetTitle className="text-xl">Фильтры</SheetTitle>
              </SheetHeader>
              
              <div className="space-y-6 overflow-y-auto h-[calc(100%-80px)] pb-6">
                <div>
                  <Label className="text-base font-semibold mb-3 block">Пол</Label>
                  <RadioGroup value={gender} onValueChange={setGender} className="flex gap-3">
                    <div className="flex-1">
                      <RadioGroupItem value="all" id="all" className="peer sr-only" />
                      <Label htmlFor="all" className="flex items-center justify-center py-3 rounded-xl border-2 border-gray-200 cursor-pointer peer-data-[state=checked]:border-rose-400 peer-data-[state=checked]:bg-rose-50 transition-all">
                        Все
                      </Label>
                    </div>
                    <div className="flex-1">
                      <RadioGroupItem value="male" id="male" className="peer sr-only" />
                      <Label htmlFor="male" className="flex items-center justify-center py-3 rounded-xl border-2 border-gray-200 cursor-pointer peer-data-[state=checked]:border-rose-400 peer-data-[state=checked]:bg-rose-50 transition-all">
                        Мужской
                      </Label>
                    </div>
                    <div className="flex-1">
                      <RadioGroupItem value="female" id="female" className="peer sr-only" />
                      <Label htmlFor="female" className="flex items-center justify-center py-3 rounded-xl border-2 border-gray-200 cursor-pointer peer-data-[state=checked]:border-rose-400 peer-data-[state=checked]:bg-rose-50 transition-all">
                        Женский
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label className="text-base font-semibold mb-3 block">Возраст</Label>
                  <div className="flex gap-2 flex-wrap">
                    {ageGroups.map((age) => (
                      <Badge 
                        key={age}
                        variant="outline" 
                        onClick={() => toggleAge(age)}
                        className={`px-4 py-2 cursor-pointer transition-all rounded-full ${
                          selectedAge.includes(age) 
                            ? 'bg-mint-100 border-mint-400 text-mint-700' 
                            : 'hover:bg-mint-50'
                        }`}
                      >
                        {age}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-base font-semibold mb-3 block">Интересы</Label>
                  <div className="flex gap-2 flex-wrap">
                    {interests.map((interest) => (
                      <Badge 
                        key={interest}
                        variant="outline" 
                        onClick={() => toggleInterest(interest)}
                        className={`px-4 py-2 cursor-pointer transition-all rounded-full ${
                          selectedInterests.includes(interest) 
                            ? 'bg-rose-100 border-rose-400 text-rose-700' 
                            : 'hover:bg-rose-50'
                        }`}
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-base font-semibold mb-3 block">
                    Бюджет: до {budget[0].toLocaleString('ru-RU')}₽
                  </Label>
                  <Slider 
                    value={budget} 
                    onValueChange={setBudget}
                    max={20000}
                    step={500}
                    className="mt-4"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>0₽</span>
                    <span>20 000₽</span>
                  </div>
                </div>
              </div>

              <Button className="w-full rounded-xl py-6 mt-4 bg-gradient-to-r from-rose-400 to-mint-400 hover:from-rose-500 hover:to-mint-500 text-white font-semibold">
                Применить фильтры
              </Button>
            </SheetContent>
          </Sheet>
        </div>

        <div className="px-6 flex-1 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-lg font-semibold mb-4 text-gray-900">Популярные подарки</h2>
          <div className="grid grid-cols-2 gap-4">
            {gifts.map((gift, idx) => (
              <Card 
                key={gift.id}
                className="overflow-hidden border-0 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all hover-scale cursor-pointer animate-scale-in"
                style={{ animationDelay: `${0.4 + idx * 0.05}s` }}
              >
                <div className="relative aspect-square bg-gradient-to-br from-rose-100 to-mint-100 flex items-center justify-center text-6xl">
                  {gift.image}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(gift.id);
                    }}
                  >
                    <Icon 
                      name="Heart" 
                      size={20} 
                      className={favorites.includes(gift.id) ? 'fill-rose-500 text-rose-500' : ''} 
                    />
                  </Button>
                </div>
                <div className="p-3">
                  <p className="text-xs text-gray-500 mb-1">{gift.category}</p>
                  <h3 className="font-semibold text-sm mb-2 text-gray-900">{gift.name}</h3>
                  <p className="text-rose-600 font-bold">{gift.price}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

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