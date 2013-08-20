  Scenario: New Card
    Given a browser window is open
    And I am logged in as user "alice" with password "secret"
    When I navigate to the URL of the home page
    And I click on an existing affinity diagram
    And I double-click on an empty place on the diagram
    And I see a textbox with placeholder text "Concept Title"  
    And I type "New Concept"
    And I click on an empty place on the diagram
    Then I see a new card with the title "New Concept"
