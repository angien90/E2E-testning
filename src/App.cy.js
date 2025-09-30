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

  it('låter användaren lägga till en ny vana', () => {
    cy.get('.habit-form-section').within(() => {
      cy.get('input').type('Dricka vatten')
      cy.get('select').select('dagligen')
      cy.get('form').submit()
    })

    cy.contains('Dricka vatten').should('exist')
  })

  it('låter användaren ändra status på en vana', () => {
    // Lägg till vana först
    cy.get('.habit-form-section').within(() => {
      cy.get('input').type('Springa')
      cy.get('select').select('veckovis')
      cy.get('form').submit()
    })

    // Ändra status på rätt habit-item
    cy.contains('.habit-item', 'Springa')
      .find('select')
      .select('Implementerad')

    cy.contains('Implementerade vanor').should('exist')
    cy.contains('.implemented .habit-item', 'Springa').should('exist')
  })

  it('låter användaren ta bort en vana', () => {
    // Lägg till vana först
    cy.get('.habit-form-section').within(() => {
      cy.get('input').type('Meditera')
      cy.get('select').select('dagligen')
      cy.get('form').submit()
    })

    // Ta bort rätt vana
    cy.contains('.habit-item', 'Meditera')
      .find('.btn.remove')
      .click()

    cy.contains('Meditera').should('not.exist')
  })
})
