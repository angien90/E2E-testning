import HabitList from './HabitList.vue'

describe('<HabitList />', () => {
  const habits = [
    { id: 1, name: 'Dricka vatten', frequency: 'dagligen', status: 'Ej implementerad' },
    { id: 2, name: 'Springa', frequency: 'veckovis', status: 'Implementerad' }
  ]

  it('renderar alla habits', () => {
    cy.mount(HabitList, { props: { habits } })
    cy.get('.habit-list .habit-item').should('have.length', 2)
    cy.contains('Dricka vatten').should('exist')
    cy.contains('Springa').should('exist')
  })

  it('emittar remove när ett HabitItem triggar remove', () => {
    cy.mount(HabitList, {
      props: { habits, onRemove: cy.spy().as('onRemove') }
    })
    cy.get('.habit-item').first().find('.btn.remove').click()
    cy.get('@onRemove').should('have.been.calledWith', 1)
  })

  it('emittar edit när ett HabitItem triggar edit', () => {
    cy.mount(HabitList, {
      props: { habits, onEdit: cy.spy().as('onEdit') }
    })
    cy.get('.habit-item').last().find('.btn.edit').click()
    cy.get('@onEdit').should('have.been.calledWith', 2)
  })

  it('emittar update när status ändras i ett HabitItem', () => {
    cy.mount(HabitList, {
      props: { habits, onUpdate: cy.spy().as('onUpdate') }
    })
    cy.get('.habit-item').first().find('select').select('Implementerad')
    cy.get('@onUpdate').should('have.been.calledWith', {
      ...habits[0],
      status: 'Implementerad'
    })
  })
})
