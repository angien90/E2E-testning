import HabitItem from './HabitItem.vue'

describe('<HabitItem />', () => {
  const baseHabit = {
    id: 1,
    name: 'Dricka vatten',
    frequency: 'dagligen',
    status: 'Ej implementerad'
  }

  it('renderar habitens namn och frekvens', () => {
    cy.mount(HabitItem, { props: { habit: baseHabit } })
    cy.get('.habit-name').should('contain', 'Dricka vatten')
    cy.get('.habit-frequency').should('contain', 'dagligen')
  })

  it('emittar edit-event när man klickar på ändra-knappen', () => {
    cy.mount(HabitItem, {
      props: { habit: baseHabit, onEdit: cy.spy().as('onEdit') }
    })
    cy.get('.btn.edit').click()
    cy.get('@onEdit').should('have.been.calledWith', baseHabit.id)
  })

  it('ta bort-knappen är inaktiv om status inte är Implementerad', () => {
    cy.mount(HabitItem, { props: { habit: baseHabit } })
    cy.get('.btn.remove').should('be.disabled')
  })

  it('visar felmeddelande om man försöker ta bort en vana som ej är klar', () => {
    cy.mount(HabitItem, { props: { habit: baseHabit } })
    cy.get('.btn.remove')
      .invoke('removeAttr', 'disabled') // endast för test
      .click()
    cy.contains('Endast färdiga vanor kan tas bort').should('exist')
  })

  it('emittar remove-event när status är Implementerad', () => {
    cy.mount(HabitItem, {
      props: { habit: { ...baseHabit, status: 'Implementerad' }, onRemove: cy.spy().as('onRemove') }
    })
    cy.get('.btn.remove')
      .should('not.be.disabled')
      .click()
    cy.get('@onRemove').should('have.been.calledWith', baseHabit.id)
  })

  it('ändrar status via select och emittar update', () => {
    cy.mount(HabitItem, {
      props: { habit: baseHabit, onUpdate: cy.spy().as('onUpdate') }
    })
    cy.get('select').select('Implementerad')
    cy.get('@onUpdate').should('have.been.calledWith', {
      ...baseHabit,
      status: 'Implementerad'
    })
  })

  it('lägger till .completed-klassen när status är Implementerad', () => {
    cy.mount(HabitItem, {
      props: { habit: { ...baseHabit, status: 'Implementerad' } }
    })
    cy.get('.habit-item').should('have.class', 'completed')
    cy.get('.habit-name').should('have.css', 'text-decoration').and('contain', 'line-through')
  })
})
