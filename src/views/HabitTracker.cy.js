import HabitTracker from './HabitTracker.vue'

describe('<HabitTracker /> - Ta bort knapp och status', () => {
  beforeEach(() => {
    cy.mount(HabitTracker)
  })

  it('ta bort-knappen är inaktiv om status inte är Implementerad', () => {
    cy.get('input[name="name"]').type('Dricka vatten')
    cy.get('select[name="frequency"]').select('dagligen')
    cy.get('form').submit()

    cy.contains('.habit-item', 'Dricka vatten')
      .find('.btn.remove')
      .should('be.disabled')
  })

  it('visar felmeddelande om man försöker ta bort en vana som ej är klar', () => {
    cy.get('input[name="name"]').type('Meditera')
    cy.get('select[name="frequency"]').select('dagligen')
    cy.get('form').submit()

    cy.contains('.habit-item', 'Meditera')
      .find('.btn.remove')
      .invoke('removeAttr', 'disabled') // endast för test
      .click()

    cy.contains('Endast färdiga vanor kan tas bort').should('exist')
  })

  it('ta bort-knappen fungerar när status är Implementerad', () => {
    cy.get('input[name="name"]').type('Springa')
    cy.get('select[name="frequency"]').select('veckovis')
    cy.get('form').submit()

    cy.contains('.habit-item', 'Springa')
      .find('select')
      .select('Implementerad')

    cy.contains('.habit-item', 'Springa')
      .find('.btn.remove')
      .should('not.be.disabled')
      .click()

    cy.contains('Springa').should('not.exist')
  })
})
