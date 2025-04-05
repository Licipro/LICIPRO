import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectItem } from "@/components/ui/select";
import { format } from "date-fns";

export default function LiciproApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [licitacoes, setLicitacoes] = useState([]);
  const [form, setForm] = useState({
    titulo: "",
    resumo: "",
    data: "",
    hora: "",
    portal: "",
    tipo: "Dispensa",
    cidade: "",
    orgao: "",
    status: "Em andamento",
  });

  const handleLogin = () => {
    if (email === "admin@licipro.com" && password === "123456") {
      setIsLoggedIn(true);
    } else {
      alert("Usuário ou senha inválidos");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail("");
    setPassword("");
  };

  const handleSubmit = () => {
    if (!form.titulo || !form.data || !form.hora || !form.portal) return;
    const nova = { ...form, id: Date.now() };
    setLicitacoes([nova, ...licitacoes]);
    setForm({
      titulo: "",
      resumo: "",
      data: "",
      hora: "",
      portal: "",
      tipo: "Dispensa",
      cidade: "",
      orgao: "",
      status: "Em andamento",
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Card className="max-w-md w-full">
          <CardContent className="space-y-4 p-6">
            <h2 className="text-2xl font-bold text-center">Entrar no Licipro</h2>
            <Input placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button onClick={handleLogin} className="w-full">Entrar</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <img src="/logo.png" alt="Licipro" className="mx-auto h-20" />
          <h1 className="text-4xl font-extrabold text-blue-800 mt-4">LICIPRO</h1>
          <p className="text-gray-600">Sua agenda digital de licitações</p>
          <Button onClick={handleLogout} className="absolute top-4 right-4">Sair</Button>
        </div>

        <Card>
          <CardContent className="space-y-4 p-6">
            <h2 className="text-2xl font-semibold">Nova Licitação</h2>
            <Input placeholder="Título da Licitação" value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} />
            <Textarea placeholder="Resumo / Objeto da Licitação" value={form.resumo} onChange={(e) => setForm({ ...form, resumo: e.target.value })} />
            <div className="grid grid-cols-2 gap-4">
              <Input type="date" value={form.data} onChange={(e) => setForm({ ...form, data: e.target.value })} />
              <Input type="time" value={form.hora} onChange={(e) => setForm({ ...form, hora: e.target.value })} />
            </div>
            <Input placeholder="Portal (ex: Comprasnet, BLL, etc.)" value={form.portal} onChange={(e) => setForm({ ...form, portal: e.target.value })} />
            <Select value={form.tipo} onValueChange={(val) => setForm({ ...form, tipo: val })}>
              <SelectItem value="Dispensa">Dispensa</SelectItem>
              <SelectItem value="Pregão Eletrônico">Pregão Eletrônico</SelectItem>
              <SelectItem value="Concorrência">Concorrência</SelectItem>
              <SelectItem value="Tomada de Preços">Tomada de Preços</SelectItem>
              <SelectItem value="Carta Convite">Carta Convite</SelectItem>
            </Select>
            <Input placeholder="Cidade" value={form.cidade} onChange={(e) => setForm({ ...form, cidade: e.target.value })} />
            <Input placeholder="Órgão" value={form.orgao} onChange={(e) => setForm({ ...form, orgao: e.target.value })} />
            <Select value={form.status} onValueChange={(val) => setForm({ ...form, status: val })}>
              <SelectItem value="Em andamento">Em andamento</SelectItem>
              <SelectItem value="Enviado">Enviado</SelectItem>
              <SelectItem value="Homologado">Homologado</SelectItem>
              <SelectItem value="Cancelado">Cancelado</SelectItem>
            </Select>
            <Button onClick={handleSubmit}>Adicionar Licitação</Button>
          </CardContent>
        </Card>

        <div className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">Licitações Cadastradas</h2>
          {licitacoes.length === 0 && <p className="text-gray-500">Nenhuma licitação cadastrada ainda.</p>}
          {licitacoes
            .sort((a, b) => new Date(a.data + 'T' + a.hora) - new Date(b.data + 'T' + b.hora))
            .map((l) => (
              <Card key={l.id}>
                <CardContent className="p-4 space-y-1">
                  <p className="font-bold text-xl">{l.titulo}</p>
                  <p className="text-sm text-gray-500">{format(new Date(l.data + 'T' + l.hora), "dd/MM/yyyy HH:mm")} - {l.portal}</p>
                  <p className="text-sm text-gray-600">Tipo: {l.tipo}</p>
                  <p className="text-sm text-gray-600">Cidade: {l.cidade}</p>
                  <p className="text-sm text-gray-600">Órgão: {l.orgao}</p>
                  <p className="text-sm">{l.resumo}</p>
                  <span className="text-xs px-2 py-1 bg-blue-100 rounded">{l.status}</span>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
}