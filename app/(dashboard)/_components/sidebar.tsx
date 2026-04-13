export default function Sidebar() {
  return (
    <div className="w-64 rounded-r-lg bg-white">
      <div className="px-8 py-6">
        <h1 className="text-2xl font-bold">Stockly</h1>
      </div>
      {/* BOTÕES */}
      <div className="flex flex-col gap-2 p-2">
        <button className="px-6 py-3">Botão 1</button>
        <button className="px-6 py-3">Botão 2</button>
        <button className="px-6 py-3">Botão 3</button>
      </div>
    </div>
  );
}
