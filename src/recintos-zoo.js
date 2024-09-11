// recintos-zoo.js
class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanhoTotal: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] },
            { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animais: [] },
            { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
            { numero: 4, bioma: 'rio', tamanhoTotal: 8, animais: [] },
            { numero: 5, bioma: 'savana', tamanhoTotal: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] },
        ];

        this.animaisPermitidos = {
            LEAO: { tamanho: 3, biomas: ['savana'], carnivoro: true },
            LEOPARDO: { tamanho: 2, biomas: ['savana'], carnivoro: true },
            CROCODILO: { tamanho: 3, biomas: ['rio'], carnivoro: true },
            MACACO: { tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false },
            GAZELA: { tamanho: 2, biomas: ['savana'], carnivoro: false },
            HIPOPOTAMO: { tamanho: 4, biomas: ['savana', 'rio'], carnivoro: false },
        };
    }

    analisaRecintos(animal, quantidade) {
        const especie = this.animaisPermitidos[animal];
        const recintosViaveis = [];

        if (!this.animaisPermitidos[animal]) return { erro: "Animal inválido" };
        if (isNaN(quantidade) || quantidade <= 0) return { erro: "Quantidade inválida" };
    
        this.recintos.forEach(recinto => {
            if (animal === 'HIPOPOTAMO' && recinto.bioma !== 'savana e rio') {
                return;
            }

            let espacoOcupado = recinto.animais.reduce((total, a) => {
                const especieAnimal = this.animaisPermitidos[a.especie];
                return total + (especieAnimal.tamanho * a.quantidade);
            }, 0);

            const temMaisDeUmaEspecie = recinto.animais.length > 0 && !recinto.animais.some(a => a.especie === animal);
            const espacoExtra = temMaisDeUmaEspecie ? 1 : 0;
            const espacoRestante = recinto.tamanhoTotal - espacoOcupado - espacoExtra;

            const biomasRecinto = recinto.bioma.split(' e ');
            const biomaValido = especie.biomas.some(bioma => biomasRecinto.includes(bioma));

            const carnivoroNoRecinto = recinto.animais.some(a => this.animaisPermitidos[a.especie].carnivoro);

            if (biomaValido && espacoRestante >= especie.tamanho * quantidade) {
                if (especie.carnivoro && (recinto.animais.length === 0 || recinto.animais[0].especie === animal)) {
                    recintosViaveis.push(`Recinto ${recinto.numero}
                        (espaço livre: ${espacoRestante - especie.tamanho * quantidade} 
                        total: ${recinto.tamanhoTotal})`);
                        
                } else if (!especie.carnivoro && !carnivoroNoRecinto) {
                    recintosViaveis.push(`Recinto ${recinto.numero}
                        (espaço livre: ${espacoRestante - especie.tamanho * quantidade} 
                        total: ${recinto.tamanhoTotal})`);
                }
            }
        });

        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        }

        return { recintosViaveis: recintosViaveis };
    }
}

export { RecintosZoo };
