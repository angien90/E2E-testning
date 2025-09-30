import HabitForm from './HabitForm.vue'

describe('<HabitForm />', () => {
  it('renderar input, select och knapp', () => {
    cy.mount(HabitForm)
    cy.get('input[placeholder="Ny vana"]').should('exist')
    cy.get('select.frequency').should('exist')
    cy.get('button[type="submit"]').should('exist')
  })

  it('låter användaren skriva in en vana och välja frekvens', () => {
    cy.mount(HabitForm)
    cy.get('input[placeholder="Ny vana"]').type('Dricka vatten')
    cy.get('select.frequency').select('veckovis')
    cy.get('input[placeholder="Ny vana"]').should('have.value', 'Dricka vatten')
    cy.get('select.frequency').should('have.value', 'veckovis')
  })

  it('emittar submit-event med rätt data', () => {
    cy.mount(HabitForm, {
      props: {
        onSubmit: cy.spy().as('onSubmit') // fånga emit
      }
    })

    cy.get('input[placeholder="Ny vana"]').type('Meditera')
    cy.get('select.frequency').select('månadsvis')
    cy.get('form').submit()

    cy.get('@onSubmit').should('have.been.calledWith', {
      name: 'Meditera',
      frequency: 'månadsvis'
    })
  })

  it('rensa fälten efter submit', () => {
    cy.mount(HabitForm)

    cy.get('input[placeholder="Ny vana"]').type('Springa')
    cy.get('form').submit()

    cy.get('input[placeholder="Ny vana"]').should('have.value', '')
    cy.get('select.frequency').should('have.value', 'dagligen')
  })
})