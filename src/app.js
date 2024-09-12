import { RecintosZoo } from './recintos-zoo.js';

document.addEventListener('DOMContentLoaded', function () {
    const recintosZoo = new RecintosZoo();
    const form = document.getElementById('animal-form');

    const alertaSucesso = document.getElementById('success-alert');
    const alertaErro = document.getElementById('error-alert');
    const mensagemSucesso = document.getElementById('success-message');
    const mensagemErro = document.getElementById('error-message');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const animal = form.elements['animal'].value.toUpperCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        const quantidade = form.elements['quantidade'].value;

        alertaSucesso.classList.add('d-none');
        alertaErro.classList.add('d-none');

        const resultado = recintosZoo.analisaRecintos(animal, quantidade);

        if (resultado.erro) {
            mensagemErro.textContent = resultado.erro;
            alertaErro.classList.remove('d-none');
            alertaErro.scrollIntoView({ behavior: 'smooth' });
        } else {
            mensagemSucesso.textContent = `Recintos viáveis: ${resultado.recintosViaveis.join(', ')}`;
            alertaSucesso.classList.remove('d-none');
            alertaSucesso.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
