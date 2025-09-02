describe('Авторизация', () => {
  it('Создание тренировки', () => {
    const today = new Date(Date.now());
    let thisDay = today.getDate().toString();
    let thisMonth = (today.getMonth() + 1).toString();
    const thisYear = today.getFullYear();

    if (Number(thisDay) < 10) thisDay = '0' + thisDay;
    if (Number(thisMonth) < 10) thisMonth = '0' + thisDay;

    cy.visit('http://localhost:4200/')
    cy.get('.login-input').type('doctorrosen2016@gmail.com')
    cy.get('tui-input.password-input').type('123456')
    cy.get('button[type="submit"]').click()
    cy.get('.content__item').contains('Планировщик тренировок').click()
    cy.get('.top-container .container-buttons button[type="button"]').click()
    cy.get('.trainingForm__date_slot').click().type(thisDay + thisMonth + thisYear).click()
    cy.get('.trainingForm__time_slot').click()
    cy.get('tui-select-option').contains('11:00').click()
  })
  // it('Вход в планировщик тренировок', () => {
    // cy.get('.top-container .container-buttons button[type="button"]').click()
  // })
})
