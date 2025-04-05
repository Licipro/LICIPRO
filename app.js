
const App = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [licitacoes, setLicitacoes] = React.useState([]);
  const [form, setForm] = React.useState({
    titulo: "", resumo: "", data: "", hora: "", portal: "", tipo: "Dispensa",
    cidade: "", orgao: "", status: "Em andamento",
  });

  const handleLogin = () => {
    if (email === "admin@licipro.com" && password === "123456") {
      setIsLoggedIn(true);
    } else {
      alert("Usuário ou senha inválidos");
    }
  };

  const handleSubmit = () => {
    if (!form.titulo || !form.data || !form.hora || !form.portal) return;
    const nova = { ...form, id: Date.now() };
    setLicitacoes([nova, ...licitacoes]);
    setForm({ titulo: "", resumo: "", data: "", hora: "", portal: "", tipo: "Dispensa", cidade: "", orgao: "", status: "Em andamento" });
  };

  if (!isLoggedIn) {
    return (
      <div>
        <h2>Entrar no Licipro</h2>
        <input placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} /><br/>
        <input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} /><br/>
        <button onClick={handleLogin}>Entrar</button>
      </div>
    );
  }

  return (
    <div>
      <h1>LICIPRO - Agenda de Licitações</h1>
      <h3>Nova Licitação</h3>
      <input placeholder="Título" value={form.titulo} onChange={e => setForm({...form, titulo: e.target.value})} /><br/>
      <input placeholder="Resumo" value={form.resumo} onChange={e => setForm({...form, resumo: e.target.value})} /><br/>
      <input type="date" value={form.data} onChange={e => setForm({...form, data: e.target.value})} />
      <input type="time" value={form.hora} onChange={e => setForm({...form, hora: e.target.value})} /><br/>
      <input placeholder="Portal" value={form.portal} onChange={e => setForm({...form, portal: e.target.value})} /><br/>
      <input placeholder="Cidade" value={form.cidade} onChange={e => setForm({...form, cidade: e.target.value})} /><br/>
      <input placeholder="Órgão" value={form.orgao} onChange={e => setForm({...form, orgao: e.target.value})} /><br/>
      <select value={form.tipo} onChange={e => setForm({...form, tipo: e.target.value})}>
        <option>Dispensa</option><option>Pregão Eletrônico</option><option>Concorrência</option>
      </select><br/>
      <select value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
        <option>Em andamento</option><option>Enviado</option><option>Homologado</option><option>Cancelado</option>
      </select><br/>
      <button onClick={handleSubmit}>Adicionar</button>

      <h3>Licitações</h3>
      {licitacoes.map(l => (
        <div key={l.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <strong>{l.titulo}</strong><br/>
          {l.data} {l.hora} - {l.portal}<br/>
          {l.tipo} | {l.cidade} | {l.orgao}<br/>
          {l.resumo}<br/>
          <em>{l.status}</em>
        </div>
      ))}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
