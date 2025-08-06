import * as data from "../helpers/default_data.json";
import * as login_page from "../locators/login_page.json"
import * as header from "../locators/header.json"
import * as profile_page from "../locators/profile_page.json"
import * as shop_page from "../locators/shop_page.json"
import * as payment_page from "../locators/payment_page.json"

describe('Покупка аватара', function () {

   it('Покупка аватара', function () {
    cy.visit('/');
    cy.get(login_page.email).type(data.login);
    cy.get(login_page.password).type(data.password);
    cy.wait(2000);
    cy.get(login_page.login_button).click();   //Авторизация

    cy.get(header.myprofile).click();
    cy.wait(2000);
    cy.get(profile_page.avatar).invoke('attr', 'src').then((src) => {oldAvatarUrl = src;});   //Сохранение URL старого аватара в переменную
    cy.get(profile_page.change_avatar).click();   //Переход в раздел "Смена аватара"

    cy.get(shop_page.available_avarar).then($el => $el[Math.floor(Math.random() * $el.length)].click());  //Выбрать случайный аватар из доступных

    cy.get(payment_page.card_number).type(data.card_number);
    cy.get(payment_page.card_actual).type(data.card_actual);
    cy.get(payment_page.card_cvv).type(data.card_cvv);
    cy.get(payment_page.card_name).type(data.card_name);
    cy.wait(2000);
    cy.get(payment_page.pay_button).click();   //Кнопка "Оплатить"

    cy.get(payment_page.secure_code).type(data.secure_code);
    cy.get(payment_page.pay_button).click();
    cy.get(payment_page.status).should('be.visible');
    cy.get(payment_page.status).contains('Покупка прошла успешно'); //Проверка надписи после успешной покупки

    cy.get(payment_page.return_button).click();
    cy.get(header.myprofile).click();
    cy.wait(2000);
    cy.get(profile_page.avatar).invoke('attr', 'src').should((newSrc) => {expect(newSrc).to.not.eq(oldAvatarUrl);});   //Проверка, что новый аватар отличается от старого
    })
})