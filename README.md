# StarDefender
A game written in JavaScript and HTML5
Description:
	Star Defender is a point-click tower defense game based on Starcraft with a resource pool and multiple types of enemies that head down lanes towards your main base. You can place multiple types of defensive structures along the lane’s paths to defend your base. Waves of enemies will spawn on a timer, but beware each wave gets more difficult, after all waves have been defeated you win the round and move on to the next map. If your base’s health reaches zero you lose! Build as if your life depends on it!
  Game Summary:
  Animated Resources:
  Game will feature many characters from the Starcraft universe, as animated sprites from the original Starcraft will be enemies walking through lanes that must be destroyed before reaching the user’s base. The user will have the option to build towers which can kill the enemies, with towers shooting animated projectiles at the enemies currently painted on the canvas. Towers will also be Starcraft themed, and we hope to implement strengths and weaknesses of towers/enemies in a manner that stays true to the spirit of the original Starcraft. If time allows, we are considering further animations of user spells - but our main focus are the towers and enemies.


  Controls:
  Because of the nature of tower defense games, the main controls will be the mouse. User will point and click on valid tower locations to create a tower. In addition, we would like to implement keyboard shortcuts for tower creation and/or other features that may be added to the game.

  Interaction:
  Tower projectiles must be able to interact with enemies in order to kill them before reaching base. Towers will also be managed using a resource system, with at least 1 tower designated as a resource generating tower. In addition, enemies will be able to detect if their movement direction will lead into a wall, and switch to a valid direction (with their sprites rotating to face their new movement direction). When enemies reach the user base, enemy should disappear from the canvas and do a predetermined amount of damage to the user’s health. If an enemy is destroyed successfully by a tower, enemy should be removed from the canvas and resources should be given as a reward to the user. Enemies will only be able to walk on the designated trails, and the user will only be allowed to build towers on areas that are not trails. Tower AI will target enemies based both on proximity and special tower features detailed below.

  Extras:
  Boss battles featuring unique enemy units. Multiple play modes/difficulties. Traps and user controlled spells/attacks on enemies. More details in the final deliverable section of the feature list below.

  For the following feature list, we hope to implement all listed design plans. However, given time constraints, certain features may not be possible to implement from our final deliverable.
  Feature List:
  Prototype Build:
  One map
  Base placement
  A lane configuration
  Travel path of lane for enemy
  Terrain collision detection
  Terrain Textures
  Non-Buildable terrain
  One standard type of enemy
  Working animated sprite
  One defensive structure
  With working ability and damage
  One base with health pool
  Resource pool

  Minimal Deliverable Build:
  Multiple maps (3+)
  Different lane configurations
  Different terrain visuals
  Defensive Structures
  Slowing Structure
  Does light area of effect damage that slows enemies for x amount of time
  Does medium damage over  x amount of time
  Anti-Air Structure
  Single target
  Medium Damage
  Only targets air units
  Anti-Siege Structure
  Single target damage
  High Damage
  Prioritizes high healthpool targets, otherwise targets closest enemy
  Slow fire rate
  Resource Structure
  Increase passive resource generation rate
  Single target damage
  Low Damage
  Normal Fire rate
  Enemies
  Sergling
  Low Health
  Low Damage
  Fast Movement Speed
  Stroach
  High Health
  High Damage
  Slow Movement
  Starling
  Medium Damage
  Low Health
  Normal Movement Speed
  Hydrar
  Medium Damage
  Medium Health
  Normal Movement Speed
  Martalisk
  Air Unit (Only targetable by anti-air structure)
  Medium Health
  Medium Damage
  Slow Movement  Speed
  Ignores lane terrain, flies directly towards base
  Ability to place defense structures on buildable terrain blocks
  Working economy
  Passive resource generation
  Resources per enemy killed
  Resource gain for finishing a wave
  Bonus resources for finishing a wave without taking damage
  User Interface
  Pause when bringing up menu
  Resume
  Restart Map
  Escape to main menu
  Main Menu
  Game title
  About
  Play
  How to Play...
  Multiple waves of enemies
  Come out on a set timer
  Score System
  Gain score based on enemies killed
  Waves Killed
  Waves Killed without taking damage
  Maps won

  Final Deliverable Build:
  Setting to change time between waves
  Endless wave mode
  Play until you die!
  Difficulty settings
  Noob
  Health of enemies decreased
  Damage taken by enemies increased
  Waves spawn on a slower timer
  Casual
  Health of enemies normal
  Damage taken by enemies normal
  Waves spawn on a normal timer
  Hellish
  Health of enemies increased
  Damage taken by enemies increased
  Waves spawn on a faster timer
  Torment
  Health of enemies severely increased
  Damage taken by enemies severely increased
  Waves spawn on a much faster timer
  Traps
  Time Trap:
  Stops all enemy movement for a short period of time
  Nuke Trap:
  Does x amount of damage to all enemies currently on map
  Spell abilities that are picked up as loot from random enemies that have a small chance to drop them
  One time consumable use per trap
  Can be placed on lane paths and are triggered upon the first enemy that steps on them
  Upgradeable  defense structures
  Use resources to upgrade structures health and damage percentage
  Enemy Health display
  Final Boss
  Spawns after every wave is complete on each map
  Has a very high health pool (Ultra)
  Has very high damage (Ultra)
  Slowest moving unit in game (Super Slow)


  Resources:
  	https://www.spriters-resource.com/pc_computer/Starcraft/
  	https://Starcraft2.com/en-us/
