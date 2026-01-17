import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
import DashboardTab from '@/components/DashboardTab';
import AnalyticsTab from '@/components/AnalyticsTab';
import TransactionsTab from '@/components/TransactionsTab';
import AIRecommendationsTab from '@/components/AIRecommendationsTab';

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currency, setCurrency] = useState<'RUB' | 'USD' | 'EUR'>('RUB');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    title: '',
    amount: '',
    category: '',
    type: 'expense' as 'income' | 'expense'
  });

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const currencySymbols = {
    RUB: '₽',
    USD: '$',
    EUR: '€'
  };

  const totalBalance = 245680;
  const monthlyIncome = 150000;
  const monthlyExpenses = 98450;
  const savingsGoal = 500000;
  const currentSavings = 245680;

  const monthlyData = [
    { month: 'Авг', income: 145000, expenses: 95000 },
    { month: 'Сен', income: 152000, expenses: 102000 },
    { month: 'Окт', income: 148000, expenses: 98000 },
    { month: 'Ноя', income: 155000, expenses: 103000 },
    { month: 'Дек', income: 160000, expenses: 105000 },
    { month: 'Янв', income: 150000, expenses: 98450 },
  ];

  const categories = [
    { name: 'Продукты', amount: 28500, percent: 29, color: 'bg-gradient-to-r from-purple-500 to-pink-500', icon: 'ShoppingCart' },
    { name: 'Жильё', amount: 35000, percent: 36, color: 'bg-gradient-to-r from-blue-500 to-cyan-500', icon: 'Home' },
    { name: 'Транспорт', amount: 12000, percent: 12, color: 'bg-gradient-to-r from-orange-500 to-red-500', icon: 'Car' },
    { name: 'Развлечения', amount: 15450, percent: 16, color: 'bg-gradient-to-r from-green-500 to-emerald-500', icon: 'Sparkles' },
    { name: 'Сбережения', amount: 7500, percent: 8, color: 'bg-gradient-to-r from-indigo-500 to-purple-500', icon: 'PiggyBank' },
  ];

  const [recentTransactions, setRecentTransactions] = useState([
    { id: 1, title: 'Покупка продуктов', amount: -4500, category: 'Продукты', date: '18 янв', icon: 'ShoppingCart' },
    { id: 2, title: 'Зарплата', amount: 150000, category: 'Доход', date: '15 янв', icon: 'TrendingUp' },
    { id: 3, title: 'Оплата аренды', amount: -35000, category: 'Жильё', date: '12 янв', icon: 'Home' },
    { id: 4, title: 'Заправка авто', amount: -3200, category: 'Транспорт', date: '10 янв', icon: 'Car' },
    { id: 5, title: 'Фриланс проект', amount: 25000, category: 'Доход', date: '8 янв', icon: 'Briefcase' },
  ]);

  const handleAddTransaction = () => {
    if (!newTransaction.title || !newTransaction.amount || !newTransaction.category) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все поля',
        variant: 'destructive'
      });
      return;
    }

    const amount = parseFloat(newTransaction.amount);
    const finalAmount = newTransaction.type === 'expense' ? -Math.abs(amount) : Math.abs(amount);
    
    const categoryIcons: Record<string, string> = {
      'Продукты': 'ShoppingCart',
      'Жильё': 'Home',
      'Транспорт': 'Car',
      'Развлечения': 'Sparkles',
      'Сбережения': 'PiggyBank',
      'Доход': 'TrendingUp',
      'Зарплата': 'Briefcase',
      'Другое': 'DollarSign'
    };

    const transaction = {
      id: Date.now(),
      title: newTransaction.title,
      amount: finalAmount,
      category: newTransaction.category,
      date: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }),
      icon: categoryIcons[newTransaction.category] || 'DollarSign'
    };

    setRecentTransactions([transaction, ...recentTransactions]);
    setIsAddTransactionOpen(false);
    setNewTransaction({ title: '', amount: '', category: '', type: 'expense' });
    
    toast({
      title: 'Успешно!',
      description: 'Транзакция добавлена',
    });
  };

  const aiRecommendations = [
    {
      title: 'Оптимизация расходов',
      description: 'Вы тратите на 15% больше на развлечения, чем в прошлом месяце. Рекомендую сократить траты до 12 000 ₽.',
      type: 'warning',
      icon: 'AlertCircle'
    },
    {
      title: 'Достижение цели',
      description: 'При текущем темпе сбережений вы достигнете цели в 500 000 ₽ через 5 месяцев. Увеличьте откладываемую сумму до 15 000 ₽ для достижения за 3 месяца.',
      type: 'success',
      icon: 'Target'
    },
    {
      title: 'Инвестиционная возможность',
      description: 'У вас накопилось достаточно средств для диверсификации. Рассмотрите инвестирование 20% сбережений в консервативные фонды.',
      type: 'info',
      icon: 'TrendingUp'
    }
  ];

  const navItems = [
    { id: 'dashboard', label: 'Главная', icon: 'LayoutDashboard' },
    { id: 'analytics', label: 'Аналитика', icon: 'BarChart3' },
    { id: 'transactions', label: 'Транзакции', icon: 'Receipt' },
    { id: 'ai', label: 'AI Советы', icon: 'Sparkles' },
  ];

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 transition-colors duration-500 pb-20 md:pb-6">
        <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 max-w-7xl">
          <header className="flex items-center justify-between mb-6 sm:mb-8 animate-fade-in">
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                FinAI Planner
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 hidden sm:block">Ваш личный финансовый помощник</p>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <div className="hidden sm:flex items-center gap-2 bg-card/50 backdrop-blur-sm rounded-2xl px-4 py-2 border border-border/50">
                {(['RUB', 'USD', 'EUR'] as const).map((curr) => (
                  <Button
                    key={curr}
                    variant={currency === curr ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setCurrency(curr)}
                    className="rounded-xl transition-all duration-300"
                  >
                    {curr}
                  </Button>
                ))}
              </div>

              <div className="flex items-center gap-2 sm:gap-3 bg-card/50 backdrop-blur-sm rounded-2xl px-3 sm:px-4 py-2 border border-border/50">
                <Icon name="Sun" size={16} className="text-muted-foreground sm:w-[18px] sm:h-[18px]" />
                <Switch checked={isDarkMode} onCheckedChange={toggleTheme} />
                <Icon name="Moon" size={16} className="text-muted-foreground sm:w-[18px] sm:h-[18px]" />
              </div>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="rounded-2xl">
                    <Icon name="Settings" size={20} />
                  </Button>
                </SheetTrigger>
                <SheetContent className="rounded-l-3xl">
                  <SheetHeader>
                    <SheetTitle>Настройки</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-6">
                    <div>
                      <h3 className="font-semibold mb-3">Валюта</h3>
                      <div className="grid grid-cols-3 gap-2">
                        {(['RUB', 'USD', 'EUR'] as const).map((curr) => (
                          <Button
                            key={curr}
                            variant={currency === curr ? 'default' : 'outline'}
                            onClick={() => setCurrency(curr)}
                            className="rounded-xl"
                          >
                            {curr}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3">Уведомления</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Превышение бюджета</span>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Рекомендации AI</span>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </header>

          {activeTab === 'dashboard' && (
            <DashboardTab
              totalBalance={totalBalance}
              monthlyIncome={monthlyIncome}
              monthlyExpenses={monthlyExpenses}
              savingsGoal={savingsGoal}
              currentSavings={currentSavings}
              currencySymbol={currencySymbols[currency]}
              monthlyData={monthlyData}
            />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsTab
              categories={categories}
              currencySymbol={currencySymbols[currency]}
            />
          )}

          {activeTab === 'transactions' && (
            <TransactionsTab
              transactions={recentTransactions}
              currencySymbol={currencySymbols[currency]}
            />
          )}

          {activeTab === 'ai' && (
            <AIRecommendationsTab recommendations={aiRecommendations} />
          )}
        </div>

        <Dialog open={isAddTransactionOpen} onOpenChange={setIsAddTransactionOpen}>
          <DialogTrigger asChild>
            <Button 
              size="icon"
              className="fixed bottom-20 right-4 w-16 h-16 rounded-full shadow-2xl bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all duration-300 hover:scale-110 md:hidden z-40 animate-scale-in"
            >
              <Icon name="Plus" size={28} className="text-primary-foreground" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md rounded-3xl mx-4">
            <DialogHeader>
              <DialogTitle>Новая транзакция</DialogTitle>
              <DialogDescription>
                Добавьте доход или расход в ваш бюджет
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="type-mobile">Тип транзакции</Label>
                <Select
                  value={newTransaction.type}
                  onValueChange={(value: 'income' | 'expense') => 
                    setNewTransaction({ ...newTransaction, type: value })
                  }
                >
                  <SelectTrigger className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="expense">Расход</SelectItem>
                    <SelectItem value="income">Доход</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title-mobile">Название</Label>
                <Input
                  id="title-mobile"
                  placeholder="Например: Покупка продуктов"
                  className="rounded-xl"
                  value={newTransaction.title}
                  onChange={(e) => setNewTransaction({ ...newTransaction, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount-mobile">Сумма ({currencySymbols[currency]})</Label>
                <Input
                  id="amount-mobile"
                  type="number"
                  placeholder="0"
                  className="rounded-xl"
                  value={newTransaction.amount}
                  onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category-mobile">Категория</Label>
                <Select
                  value={newTransaction.category}
                  onValueChange={(value) => 
                    setNewTransaction({ ...newTransaction, category: value })
                  }
                >
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Выберите категорию" />
                  </SelectTrigger>
                  <SelectContent>
                    {newTransaction.type === 'expense' ? (
                      <>
                        <SelectItem value="Продукты">🛒 Продукты</SelectItem>
                        <SelectItem value="Жильё">🏠 Жильё</SelectItem>
                        <SelectItem value="Транспорт">🚗 Транспорт</SelectItem>
                        <SelectItem value="Развлечения">✨ Развлечения</SelectItem>
                        <SelectItem value="Сбережения">🐷 Сбережения</SelectItem>
                        <SelectItem value="Другое">💰 Другое</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="Зарплата">💼 Зарплата</SelectItem>
                        <SelectItem value="Доход">📈 Доход</SelectItem>
                        <SelectItem value="Другое">💰 Другое</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setIsAddTransactionOpen(false)}
                className="flex-1 rounded-xl"
              >
                Отмена
              </Button>
              <Button
                onClick={handleAddTransaction}
                className="flex-1 rounded-xl bg-gradient-to-r from-primary to-secondary"
              >
                Добавить
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-xl border-t border-border md:hidden z-50">
          <div className="grid grid-cols-4 gap-1 px-2 py-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-2xl transition-all duration-300 ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Icon name={item.icon as any} size={20} />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        <div className="hidden md:block">
          <div className="container mx-auto px-4 max-w-7xl mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnalyticsTab
                categories={categories}
                currencySymbol={currencySymbols[currency]}
              />

              <AIRecommendationsTab recommendations={aiRecommendations} />
            </div>

            <TransactionsTab
              transactions={recentTransactions}
              currencySymbol={currencySymbols[currency]}
            />

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in" style={{ animationDelay: '300ms' }}>
              <Dialog open={isAddTransactionOpen} onOpenChange={setIsAddTransactionOpen}>
                <DialogTrigger asChild>
                  <Button className="h-14 text-base font-semibold rounded-2xl bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
                    <Icon name="Plus" size={20} className="mr-2" />
                    Добавить транзакцию
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md rounded-3xl">
                  <DialogHeader>
                    <DialogTitle>Новая транзакция</DialogTitle>
                    <DialogDescription>
                      Добавьте доход или расход в ваш бюджет
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="type">Тип транзакции</Label>
                      <Select
                        value={newTransaction.type}
                        onValueChange={(value: 'income' | 'expense') => 
                          setNewTransaction({ ...newTransaction, type: value })
                        }
                      >
                        <SelectTrigger className="rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="expense">Расход</SelectItem>
                          <SelectItem value="income">Доход</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="title">Название</Label>
                      <Input
                        id="title"
                        placeholder="Например: Покупка продуктов"
                        className="rounded-xl"
                        value={newTransaction.title}
                        onChange={(e) => setNewTransaction({ ...newTransaction, title: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="amount">Сумма ({currencySymbols[currency]})</Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="0"
                        className="rounded-xl"
                        value={newTransaction.amount}
                        onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Категория</Label>
                      <Select
                        value={newTransaction.category}
                        onValueChange={(value) => 
                          setNewTransaction({ ...newTransaction, category: value })
                        }
                      >
                        <SelectTrigger className="rounded-xl">
                          <SelectValue placeholder="Выберите категорию" />
                        </SelectTrigger>
                        <SelectContent>
                          {newTransaction.type === 'expense' ? (
                            <>
                              <SelectItem value="Продукты">🛒 Продукты</SelectItem>
                              <SelectItem value="Жильё">🏠 Жильё</SelectItem>
                              <SelectItem value="Транспорт">🚗 Транспорт</SelectItem>
                              <SelectItem value="Развлечения">✨ Развлечения</SelectItem>
                              <SelectItem value="Сбережения">🐷 Сбережения</SelectItem>
                              <SelectItem value="Другое">💰 Другое</SelectItem>
                            </>
                          ) : (
                            <>
                              <SelectItem value="Зарплата">💼 Зарплата</SelectItem>
                              <SelectItem value="Доход">📈 Доход</SelectItem>
                              <SelectItem value="Другое">💰 Другое</SelectItem>
                            </>
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setIsAddTransactionOpen(false)}
                      className="flex-1 rounded-xl"
                    >
                      Отмена
                    </Button>
                    <Button
                      onClick={handleAddTransaction}
                      className="flex-1 rounded-xl bg-gradient-to-r from-primary to-secondary"
                    >
                      Добавить
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant="outline" className="h-14 text-base font-semibold rounded-2xl border-2">
                <Icon name="Upload" size={20} className="mr-2" />
                Импорт выписки
              </Button>
              <Button variant="outline" className="h-14 text-base font-semibold rounded-2xl border-2">
                <Icon name="Crown" size={20} className="mr-2" />
                Премиум подписка
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
