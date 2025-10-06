import HabitTracker from './HabitTracker.vue'

describe('<HabitTracker />', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
  })

  it('renderar sidan med rubrik och formulär', () => {
    cy.mount(HabitTracker)
    cy.contains('🌱 HabitHero').should('exist')
    cy.contains('Lägg till nya vanor').should('exist')
    cy.contains('Följ upp dina vanor').should('exist')
  })

  it('låter användaren lägga till en ny vana', () => {
    cy.mount(HabitTracker)

    cy.get('input[name="name"]').type('Dricka vatten')
    cy.get('select[name="frequency"]').select('dagligen')
    cy.get('form').submit()

    cy.contains('Dricka vatten').should('exist')
    cy.contains('Frekvens: dagligen').should('exist')
  })

  it('flyttar vanan till "Implementerade vanor" när status ändras', () => {
    cy.mount(HabitTracker)

    // Lägg till en ny vana
    cy.get('input[name="name"]').type('Springa')
    cy.get('select[name="frequency"]').select('veckovis')
    cy.get('form').submit()

    // Ändra status till Implementerad på rätt habit-item
    cy.contains('.habit-item .habit-name', 'Springa')
      .closest('.habit-item')   // <- korrekt nivå
      .find('select')
      .select('Implementerad')

    // Vänta tills vanan flyttas till implementerade-listan
    cy.contains('Implementerade vanor').should('exist')
    cy.contains('.implemented .habit-item', 'Springa').should('exist')
  })

  it('låter användaren ta bort en vana', () => {
    cy.mount(HabitTracker)

    // Lägg till en ny vana
    cy.get('input[name="name"]').type('Meditera')
    cy.get('select[name="frequency"]').select('dagligen')
    cy.get('form').submit()

    cy.contains('Meditera').should('exist')

    // Klicka på ta bort-knappen för just den habit-item
    cy.contains('.habit-item', 'Meditera')
      .find('.btn.remove')
      .click()

    cy.contains('Meditera').should('not.exist')
  })

  it('låter användaren sortera vanor', () => {
    cy.mount(HabitTracker)

    // Lägg till två vanor
    cy.get('input[name="name"]').type('Zumba')
    cy.get('select[name="frequency"]').select('veckovis')
    cy.get('form').submit()

    cy.get('input[name="name"]').type('Andas')
    cy.get('select[name="frequency"]').select('dagligen')
    cy.get('form').submit()

    // Klicka sortera på namn
    cy.contains('Sortera på vana').click()

    // Kontrollera att första habit-item är "Andas"
    cy.get('.habit-list .habit-item').first().should('contain', 'Andas')
  })
})
