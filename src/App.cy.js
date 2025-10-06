import App from './App.vue'

describe('<App />', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.mount(App)
  })

  it('renderar huvudkomponenter', () => {
    cy.contains('🌱 HabitHero').should('exist')
    cy.contains('Lägg till nya vanor').should('exist')
    cy.contains('Följ upp dina vanor').should('exist')
  })
})
