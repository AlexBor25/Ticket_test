import '../css/style.css';
import './plugins';
import locations from './store/locations';
import formUI from './views/form';
import ticketsUI from './views/tickets';
import currencyUI from './views/currency';

document.addEventListener('DOMContentLoaded', () => {
    initApp();
    const form = formUI.form;

    //Слушатели
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        onFormSubmit();
    });

    // Обработчики(Handlers)
    async function initApp(){
        await locations.init();
        formUI.setAutocomleteData(locations.shortCitiesList);
    }

    async function onFormSubmit(){
        // сбор ланных из инпутов
        const origin = locations.getCityCodeByKey(formUI.originValue);
        const destination = locations.getCityCodeByKey(formUI.destinationValue);
        const depart_date = formUI.departDateValue;
        const return_date = formUI.returnDateValue;
        const currency = currencyUI.currencyValue;

        await locations.fetchTickets({
            origin,
            destination,
            depart_date,
            return_date,
            currency,
        });

        console.log(locations.lastSearch);
        ticketsUI.renderTickets(locations.lastSearch);
    }
});