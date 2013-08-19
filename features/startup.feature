Feature: Startup
  In order to use the system
  As a user of the system
  I want to start the system

  Scenario: Type URL
    Given a browser window is open
    When I navigate to the URL of the home page
    Then I see the text "PMASE Tools"
    
  Scenario: Login form
    Given a browser window is open
    When I navigate to the URL of the home page
    And I click a textbox with placeholder text "Username"
    And I type "alice"
    And I click a textbox with placeholder text "Password"
    And I type "secret"
    And I click a button with text "Sign In"
    Then I see the text "Welcome, alice"