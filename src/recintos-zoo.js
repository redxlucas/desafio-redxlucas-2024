// recintos-zoo.js
class RecintosZoo {
    constructor() {
        /**
         * Definição dos animais e suas informações relevantes:
         * - tamanho: quantidade de espaço que o animal ocupa em um recinto.
         * - bioma: biomas a qual o animal pode habitar.
         * - carnivoro: se é carnívoro ou não.
         */
        this.animais = {
            LEAO: { tamanho: 3, biomas: ['savana'], carnivoro: true },
            LEOPARDO: { tamanho: 2, biomas: ['savana'], carnivoro: true },
            CROCODILO: { tamanho: 3, biomas: ['rio'], carnivoro: true },
            MACACO: { tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false },
            GAZELA: { tamanho: 2, biomas: ['savana'], carnivoro: false },
            HIPOPOTAMO: { tamanho: 4, biomas: ['savana', 'rio'], carnivoro: false },
        };

        /**
         * Definição dos recintos e seus dados relevantes.
         * - numero: numero de identificação do recinto (id).
         * - bioma: bioma ou biomas que o recinto possui.
         * - tamanhoTotal: o espaço total do recinto.
         * - animais: espécie e quantidade de de animais já alocados no recinto.
         */

        this.recintos = [
            { numero: 1, bioma: 'savana', tamanhoTotal: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] },
            { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animais: [] },
            { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
            { numero: 4, bioma: 'rio', tamanhoTotal: 8, animais: [] },
            { numero: 5, bioma: 'savana', tamanhoTotal: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] },
        ];
    }
    /**
     * Método principal que faz a análise para alocação de animais em recintos.
     * @param {*} animal Animal a ser analisado para alocação em recinto
     * @param {*} quantidade Quantidade de animais a serem alocados.
     * @returns Retorna lista de recintos disponíveis dentro das regras estabelecidas.
     */
    analisaRecintos(animal, quantidade) {
        if (!this.animais[animal]) return { erro: "Animal inválido" };
        if (quantidade <= 0) return { erro: "Quantidade inválida" };

        const especie = this.animais[animal];
        const tamanhoNecessario = especie.tamanho * quantidade;
        const recintosViaveis = [];
    
        this.recintos.forEach(recinto => {
            //Hipopótamo(s) só tolera(m) outras espécies estando num recinto com savana e rio.
            if (animal === 'HIPOPOTAMO' && recinto.animais.length !== 0 && recinto.bioma !== 'savana e rio') return;
            //Um macaco não se sente confortável sem outro animal no recinto, seja da mesma ou outra espécie.
            if (animal === 'MACACO' && recinto.animais.length === 0 && quantidade < 2) return;
            
            const espacoDisponivel = this.calculaEspacoDisponivel(recinto, animal);

            //Verifica se bioma do recinto é compatível com a espécie e se há espaço suficiente.
            if (this.verificaBioma(recinto, especie) && espacoDisponivel >= tamanhoNecessario) {
                //Um animal carnívoro devem apenas habitar somente com sua espécie.
                const podeSerAlocado = especie.carnivoro 
                    ? recinto.animais.length === 0 || recinto.animais[0].especie === animal
                    : !this.verificaEspecieCarnivora(recinto);
    
                if (podeSerAlocado) {
                    const espacoLivre = espacoDisponivel - tamanhoNecessario;
                    recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanhoTotal})`);
                }
            }
        });
        //Se nenhum recinto for viável, retorna um erro.
        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        }

        return { recintosViaveis: recintosViaveis };
    }
    /**
     * Método que calcula quanto espaço está ocupado no recinto por outros animais.
     * @param {*} recinto Recinto com espaço ocupado a ser calculado.
     * @returns Retorna o espaço ocupado.
     */
    calculaEspacoOcupado(recinto){
        let espacoOcupado = recinto.animais.reduce((total, a) => {
            const especieAnimal = this.animais[a.especie];
            return total + (especieAnimal.tamanho * a.quantidade);
        }, 0);
        return espacoOcupado;
    }

    /**
     * Método que calcula quantidade de espaço disponível para alocar animal, analisando caso sejam de espécies diferentes (regra 6).
     * @param {*} recinto Recinto com espaço a ser calculado.
     * @param {*} animal Animal a ser comparado com outros animais que já habitam o recinto.
     * @returns Retorna o espaço disponível para habitação do animal.
     */
    calculaEspacoDisponivel(recinto, animal){
        
        const espacoExtra = recinto.animais.length > 0 && !recinto.animais.some(a => a.especie === animal) ? 1 : 0;
        return recinto.tamanhoTotal - this.calculaEspacoOcupado(recinto) - espacoExtra;
    }

    /**
     * 
     * @param {*} recinto 
     * @param {*} animal 
     * @returns 
     */
    verificaBioma(recinto, animal){
        const bioma = recinto.bioma.split(' e ');
        return animal.biomas.some(b => bioma.includes(b));
    }

    verificaEspecieCarnivora(recinto){
        return recinto.animais.some(a => this.animais[a.especie].carnivoro);
    }
}

export { RecintosZoo };
