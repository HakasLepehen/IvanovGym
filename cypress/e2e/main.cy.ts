describe('Авторизация', () => {
  it('Вход на главную страницу', () => {
    cy.visit('http://localhost:4200/')
    cy.get('.login-input').type('doctorrosen2016@gmail.com')
    cy.get('tui-input.password-input').type('123456')
    cy.get('button[type="submit"]').click()
    cy.get('.content__item').contains('Планировщик тренировок').click()
    cy.get('.top-container .container-buttons button[type="button"]').click()
    cy.get('.trainingForm__date_slot').click().type('17082025').click()
    cy.get('.trainingForm__time_slot').click()
  })
  // it('Вход в планировщик тренировок', () => {
    // cy.get('.top-container .container-buttons button[type="button"]').click()
  // })
})
