import { useState, useEffect, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Crown, Plus, CheckCircle2, Star, Check, BarChart2 } from 'lucide-react';

// Interfaces
interface Plan {
  title: string;
  tag: string;
  price: string;
  description: string;
  features: string[];
  popular: boolean;
  icon: React.ElementType;
  color: string;
  llmModel?: string;
}

interface PlanFormData {
  title: string;
  price: string;
  description: string;
  transcriptionsLimit: string;
  unlimitedTranscriptions: boolean;
  storageLimit: string;
  unlimitedStorage: boolean;
  'feature-no-watermark': boolean;
  'feature-custom-logo': boolean;
  'feature-email': boolean;
  'feature-dashboard': boolean;
  'feature-priority-support': boolean;
  'feature-premium-support': boolean;
  'feature-early-updates': boolean;
}

const PlanCard = ({ plan, onCustomize }: { plan: Plan, onCustomize: (plan: Plan) => void }) => {
  const { title, tag, price, description, features, popular, color } = plan;

  return (
    <Card className={`plan-card transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 ${popular ? 'border-primary' : ''}`}>
      <CardHeader className={popular ? 'bg-primary/5' : ''}>
        <div className="flex items-center justify-between mb-4">
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
            <plan.icon className={`w-6 h-6 mr-2 ${color}`} />
            {title}
          </CardTitle>
          {tag && <span className={`px-3 py-1 text-xs font-medium ${popular ? 'bg-primary/20 text-primary' : 'bg-green-100 text-green-800'} rounded-full`}>{tag}</span>}
        </div>
        <p className="text-sm text-gray-500 mb-4">{description}</p>
        <div className="text-3xl font-bold text-gray-900">{price}<span className="text-sm font-normal text-gray-500">/mês</span></div>
      </CardHeader>
      <CardContent className="p-6">
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className={`w-5 h-5 mt-0.5 mr-2 shrink-0 ${color}`} />
              <span className="text-sm text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
        <Button variant={popular ? 'default' : 'outline'} className="w-full" onClick={() => onCustomize(plan)}>
          Personalizar Plano
        </Button>
      </CardContent>
    </Card>
  );
};

const plansData: Plan[] = [
  {
    title: 'Plano Básico',
    tag: 'Gratuito',
    price: 'R$ 0',
    description: 'Para conhecer o sistema e testar a geração de relatórios.',
    features: [
      '3 transcrições por mês',
      'Relatórios com marca d\'água',
      'Histórico de 7 dias',
      'Suporte via e-mail',
    ],
    popular: false,
    icon: CheckCircle2,
    color: 'text-green-500',
  },
  {
    title: 'Plano Profissional',
    tag: 'Popular',
    price: 'R$ 49',
    description: 'Para uso regular em consultório.',
    features: [
      '50 transcrições por mês',
      'Relatórios em PDF sem marca d\'água',
      'Histórico completo',
      'Envio por e-mail',
      'Suporte prioritário',
    ],
    popular: true,
    icon: Star,
    color: 'text-primary',
  },
  {
    title: 'Plano Ilimitado',
    tag: 'Premium',
    price: 'R$ 149',
    description: 'Para quem atende muitos pacientes.',
    features: [
      'Transcrições ilimitadas',
      'Relatórios personalizados com logo',
      'Painel completo de pacientes e relatórios',
      'Suporte premium (WhatsApp ou chat)',
      'Atualizações antecipadas',
    ],
    popular: false,
    icon: Crown,
    color: 'text-purple-600',
  },
];

const initialFormData: PlanFormData = {
  title: '', price: '', description: '',
  transcriptionsLimit: '', unlimitedTranscriptions: false,
  storageLimit: '', unlimitedStorage: false,
  'feature-no-watermark': false, 'feature-custom-logo': false, 'feature-email': false,
  'feature-dashboard': false, 'feature-priority-support': false, 'feature-premium-support': false,
  'feature-early-updates': false,
};

export function Plans() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<Plan | null>(null);
  const [formData, setFormData] = useState<PlanFormData>(initialFormData);

  const handleCustomize = (plan: Plan | {}) => {
    setCurrentPlan(plan as Plan | null);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (currentPlan && currentPlan.title) { // Check if it's an existing plan
      const getLimit = (keyword: string) => {
        const feature = currentPlan.features?.find(f => f.includes(keyword));
        if (!feature) return { limit: '', unlimited: false };
        if (feature.toLowerCase().includes('ilimitada') || feature.toLowerCase().includes('ilimitado')) {
          return { limit: '', unlimited: true };
        }
        const match = feature.match(/\d+/);
        return { limit: match ? match[0] : '', unlimited: false };
      };

      const transcription = getLimit('transcriç');
      const history = getLimit('Histórico');

      setFormData({
        title: currentPlan.title || '',
        price: currentPlan.price ? currentPlan.price.replace('R$ ', '') : '0',
        description: currentPlan.description || '',
        transcriptionsLimit: transcription.limit,
        unlimitedTranscriptions: transcription.unlimited,
        storageLimit: history.limit,
        unlimitedStorage: history.unlimited,
        'feature-no-watermark': currentPlan.features?.some(f => f.includes("sem marca d'água")),
        'feature-custom-logo': currentPlan.features?.some(f => f.includes('personalizados com logo')),
        'feature-email': currentPlan.features?.some(f => f.includes('Envio por e-mail')),
        'feature-dashboard': currentPlan.features?.some(f => f.includes('Painel completo')),
        'feature-priority-support': currentPlan.features?.some(f => f.includes('Suporte prioritário')),
        'feature-premium-support': currentPlan.features?.some(f => f.includes('Suporte premium')),
        'feature-early-updates': currentPlan.features?.some(f => f.includes('Atualizações antecipadas')),
      });
    } else {
      setFormData(initialFormData); // Reset for new plan
    }
  }, [currentPlan]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleCheckboxChange = (id: keyof PlanFormData, checked: boolean) => {
    setFormData(prev => ({ ...prev, [id]: checked }));
  };

  const handleSelectChange = (id: keyof PlanFormData, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSave = () => {
    console.log('Salvando dados do plano:', formData);
    // Here you would typically call an API to save the data
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 bg-gray-50 flex-1 overflow-y-auto">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Crown className="w-7 h-7 mr-2 text-primary" />
            Planos e Limites
          </h1>
          <p className="text-gray-600 mt-1">Gerencie os planos de assinatura e limites de uso do VicSic</p>
        </div>
        <div className="flex space-x-3">
          <Button id="add-plan-btn" onClick={() => handleCustomize({})}>
            <Plus className="w-5 h-5 mr-2" />
            <span>Novo Plano</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {plansData.map(plan => (
          <PlanCard key={plan.title} plan={plan} onCustomize={handleCustomize} />
        ))}
      </div>

      <Card className="p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <BarChart2 className="w-6 h-6 mr-2 text-primary" />
            Estatísticas de Uso por Plano
          </h3>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="rounded-full">Últimos 7 dias</Button>
            <Button variant="outline" size="sm" className="rounded-full">Últimos 30 dias</Button>
            <Button variant="secondary" size="sm" className="rounded-full">Todos os tempos</Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Card Usuários Ativos */}
          <Card className="bg-gray-50 p-4">
            <CardHeader className="p-0 mb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-700">Usuários Ativos</CardTitle>
                <span className="text-xs text-gray-500">Total: 1.248</span>
              </div>
            </CardHeader>
            <CardContent className="p-0 space-y-2">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-green-700">Básico</span>
                  <span className="font-medium">872 (70%)</span>
                </div>
                <Progress value={70} className="h-2 [&>*]:bg-green-600" />
              </div>
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-primary">Profissional</span>
                  <span className="font-medium">312 (25%)</span>
                </div>
                <Progress value={25} className="h-2 [&>*]:bg-primary" />
              </div>
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-purple-700">Ilimitado</span>
                  <span className="font-medium">64 (5%)</span>
                </div>
                <Progress value={5} className="h-2 [&>*]:bg-purple-600" />
              </div>
            </CardContent>
          </Card>

          {/* Card Transcrições no Mês */}
          <Card className="bg-gray-50 p-4">
            <CardHeader className="p-0 mb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-700">Transcrições no Mês</CardTitle>
                <span className="text-xs text-gray-500">Total: 8.450</span>
              </div>
            </CardHeader>
            <CardContent className="p-0 space-y-2">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-green-700">Básico</span>
                  <span className="font-medium">1.230 (15%)</span>
                </div>
                <Progress value={15} className="h-2 [&>*]:bg-green-600" />
              </div>
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-primary">Profissional</span>
                  <span className="font-medium">5.915 (70%)</span>
                </div>
                <Progress value={70} className="h-2 [&>*]:bg-primary" />
              </div>
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-purple-700">Ilimitado</span>
                  <span className="font-medium">1.305 (15%)</span>
                </div>
                <Progress value={15} className="h-2 [&>*]:bg-purple-600" />
              </div>
            </CardContent>
          </Card>

          {/* Card Receita Mensal */}
          <Card className="bg-gray-50 p-4">
            <CardHeader className="p-0 mb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-700">Receita Mensal (MRR)</CardTitle>
                <span className="text-xs text-gray-500">Total: R$ 24.824</span>
              </div>
            </CardHeader>
            <CardContent className="p-0 space-y-2">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-green-700">Básico</span>
                  <span className="font-medium">R$ 0 (0%)</span>
                </div>
                <Progress value={0} className="h-2 [&>*]:bg-green-600" />
              </div>
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-primary">Profissional</span>
                  <span className="font-medium">R$ 15.288 (62%)</span>
                </div>
                <Progress value={62} className="h-2 [&>*]:bg-primary" />
              </div>
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-purple-700">Ilimitado</span>
                  <span className="font-medium">R$ 9.536 (38%)</span>
                </div>
                <Progress value={38} className="h-2 [&>*]:bg-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{currentPlan?.title ? `Personalizar ${currentPlan.title}` : 'Criar Novo Plano'}</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="title">Nome do Plano</Label>
                <Input id="title" value={formData.title} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="price">Preço Mensal (R$)</Label>
                <Input id="price" type="number" value={formData.price} onChange={handleChange} />
              </div>
            </div>
            <div>
              <Label htmlFor="description">Descrição Curta</Label>
              <Input id="description" value={formData.description} onChange={handleChange} placeholder="Ex: Para uso regular em consultório." />
            </div>
            <div>
              <h4 className="text-base font-semibold text-gray-900 mb-4">Limites de Uso</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="transcriptionsLimit">Número de Transcrições</Label>
                  <Input id="transcriptionsLimit" type="number" placeholder="Ex: 50" value={formData.transcriptionsLimit} onChange={handleChange} disabled={formData.unlimitedTranscriptions} />
                  <div className="mt-2 flex items-center space-x-2">
                    <Checkbox id="unlimitedTranscriptions" checked={formData.unlimitedTranscriptions} onCheckedChange={(checked: boolean) => handleCheckboxChange('unlimitedTranscriptions', checked)} />
                    <Label htmlFor="unlimitedTranscriptions" className="text-sm font-normal">Ilimitado</Label>
                  </div>
                </div>
                <div>
                  <Label htmlFor="storageLimit">Histórico de Relatórios (dias)</Label>
                  <Input id="storageLimit" type="number" placeholder="Ex: 30" value={formData.storageLimit} onChange={handleChange} disabled={formData.unlimitedStorage} />
                   <div className="mt-2 flex items-center space-x-2">
                    <Checkbox id="unlimitedStorage" checked={formData.unlimitedStorage} onCheckedChange={(checked: boolean) => handleCheckboxChange('unlimitedStorage', checked)} />
                    <Label htmlFor="unlimitedStorage" className="text-sm font-normal">Ilimitado</Label>
                  </div>
                </div>
              </div>
            </div>
             <div>
                <h4 className="text-base font-semibold text-gray-900 mb-4">Recursos e Funcionalidades</h4>
                <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                    <Label className="flex items-center">
                        <Checkbox id="feature-no-watermark" checked={formData['feature-no-watermark']} onCheckedChange={(checked: boolean) => handleCheckboxChange('feature-no-watermark', checked)} />
                        <span className="ml-2 text-sm text-gray-700">Relatórios sem marca d'água</span>
                    </Label>
                    <Label className="flex items-center">
                        <Checkbox id="feature-custom-logo" checked={formData['feature-custom-logo']} onCheckedChange={(checked: boolean) => handleCheckboxChange('feature-custom-logo', checked)} />
                        <span className="ml-2 text-sm text-gray-700">Relatórios com logo personalizado</span>
                    </Label>
                    <Label className="flex items-center">
                        <Checkbox id="feature-email" checked={formData['feature-email']} onCheckedChange={(checked: boolean) => handleCheckboxChange('feature-email', checked)} />
                        <span className="ml-2 text-sm text-gray-700">Envio por e-mail</span>
                    </Label>
                     <Label className="flex items-center">
                        <Checkbox id="feature-dashboard" checked={formData['feature-dashboard']} onCheckedChange={(checked: boolean) => handleCheckboxChange('feature-dashboard', checked)} />
                        <span className="ml-2 text-sm text-gray-700">Painel completo</span>
                    </Label>
                    <Label className="flex items-center">
                        <Checkbox id="feature-priority-support" checked={formData['feature-priority-support']} onCheckedChange={(checked: boolean) => handleCheckboxChange('feature-priority-support', checked)} />
                        <span className="ml-2 text-sm text-gray-700">Suporte prioritário</span>
                    </Label>
                    <Label className="flex items-center">
                        <Checkbox id="feature-premium-support" checked={formData['feature-premium-support']} onCheckedChange={(checked: boolean) => handleCheckboxChange('feature-premium-support', checked)} />
                        <span className="ml-2 text-sm text-gray-700">Suporte premium (WhatsApp/Chat)</span>
                    </Label>
                    <Label className="flex items-center">
                        <Checkbox id="feature-early-updates" checked={formData['feature-early-updates']} onCheckedChange={(checked: boolean) => handleCheckboxChange('feature-early-updates', checked)} />
                        <span className="ml-2 text-sm text-gray-700">Atualizações antecipadas</span>
                    </Label>
                </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button onClick={handleSave}>Salvar Alterações</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
