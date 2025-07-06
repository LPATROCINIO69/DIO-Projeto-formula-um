import fastify from "fastify";
import cors from "@fastify/cors";


const teams = [
  { id: 1, name: "Red Bull Racing", base: "Milton Keynes, Reino Unido" },
  { id: 2, name: "Mercedes-AMG Petronas", base: "Brackley, Reino Unido" },
  { id: 3, name: "Ferrari", base: "Maranello, Itália" },
  { id: 4, name: "McLaren", base: "Woking, Reino Unido" },
  { id: 5, name: "Aston Martin", base: "Silverstone, Reino Unido" },
  { id: 6, name: "Alpine", base: "Enstone, Reino Unido" },
  { id: 7, name: "Williams", base: "Grove, Reino Unido" },
  { id: 8, name: "RB (Visa Cash App RB)", base: "Faenza, Itália" },
  { id: 9, name: "Kick Sauber", base: "Hinwil, Suíça" },
  { id: 10, name: "Haas F1 Team", base: "Kannapolis, Estados Unidos" }
];

const drivers = [
  { id: 1, name: "Max Verstappen", team: "Red Bull Racing" },
  { id: 2, name: "Sergio Pérez", team: "Red Bull Racing" },
  { id: 3, name: "Lewis Hamilton", team: "Ferrari" },
  { id: 4, name: "Charles Leclerc", team: "Ferrari" },
  { id: 5, name: "George Russell", team: "Mercedes-AMG Petronas" },
  { id: 6, name: "Carlos Sainz", team: "Williams" },
  { id: 7, name: "Lando Norris", team: "McLaren" },
  { id: 8, name: "Oscar Piastri", team: "McLaren" },
  { id: 9, name: "Fernando Alonso", team: "Aston Martin" },
  { id: 10, name: "Lance Stroll", team: "Aston Martin" },
  { id: 11, name: "Esteban Ocon", team: "Alpine" },
  { id: 12, name: "Pierre Gasly", team: "Alpine" },
  { id: 13, name: "Valtteri Bottas", team: "Kick Sauber" },
  { id: 14, name: "Zhou Guanyu", team: "Kick Sauber" },
  { id: 15, name: "Yuki Tsunoda", team: "RB (Visa Cash App RB)" },
  { id: 16, name: "Daniel Ricciardo", team: "RB (Visa Cash App RB)" },
  { id: 17, name: "Alexander Albon", team: "Williams" },
  { id: 18, name: "Logan Sargeant", team: "Williams" },
  { id: 19, name: "Kevin Magnussen", team: "Haas F1 Team" },
  { id: 20, name: "Nico Hülkenberg", team: "Haas F1 Team" }
];


const server = fastify({
    logger:true
});

// Introduz restrição de acesso ao backend pelo navegador no frontend.
// Pode limitar o ip de origem, ou o tipo de método que será usado.
server.register(cors,{origin:"*", methods:["GET","POST"]});


server.get("/teams", async (request, response)=>{
    response.type("application/json").code(200);
    return {teams};
});

server.get("/drivers",async (request, response)=>{
    response.type("application/json").code(200);
    return {drivers};
});


interface DriverParams{
    id: string
}

server.get<{Params:DriverParams}>("/drivers/:id", async (request, response)=>{
    const id:number = parseInt(request.params.id);
    const driver = drivers.find(d=>d.id===id);
    if (!driver) {
        response.type("application/json").code(404);
        return {message: "Driver not found."};
    } else {
        response.type("application/json").code(200);
        return {driver};
    }
    
});

server.listen({port:3333},() =>{
    console.log("Server init.");
});
