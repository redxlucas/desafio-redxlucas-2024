import { RecintosZoo } from './recintos-zoo.js';

        const recintosZoo = new RecintosZoo();
        const form = document.getElementById('animal-form');
        const resultElement = document.getElementById('result');

        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const animal = form.elements['animal'].value.toUpperCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
            const quantidade = form.elements['quantidade'].value;

            const resultado = recintosZoo.analisaRecintos(animal, quantidade);

            if (resultado.erro) {
                resultElement.textContent = resultado.erro;
            } else {
                resultElement.textContent = `Recintos viáveis: ${resultado.recintosViaveis.join(', ')}`;
            }
        });