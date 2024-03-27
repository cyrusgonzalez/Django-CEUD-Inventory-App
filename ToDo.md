1. Trailing logs
- Manages traffic and overused parts
- Can allow for refinement given the scale of items within and out
- Track by NetID of who moved what, when and where
- Report crashes to supervisors and staff

1. Full categorical manipulation of the items in how they are stored, created, edited, and deleted
- Allow for new categories to be added [type, locations, and department]
-- locational mapping
- Allow for supervisors to delete and edit these only

1. A new dynamic database structure 
- Import/Exportability for audits and logging transactions over time:
-- Formats: CSV, XLSX, XML, SVG/INF (for database schema movement) for import/export
-- Locational mapping and many side interfaces on all componenets and the computers or printers that they reference
- Relational database tie ins that rework the way that these database systems interact with other locations or storage systems 
- Backups for the database on a weekly cycle

2. Communication tabs (Slack API tie in)
- New request system for parts  that can be seen and fulfilled
- Tally system for all the parts so that their whereabouts and needs are tracked
- Forum based note taking to ensure communications on items of functions between many different people
- Allow others to see and message groups [depending on roles and permissions]

3. New privileges and roles -Done
- admin needs to be reworked
- supervisor, students, and staff roles
- better handling of permissions internally rather than registration
- rid the app of static flags and labels inconducive to sizability

3. Complete reworking of the front end (the look of the app), along with how some of the features are presented.
- Using React instead of HTML and ASP in order to increse functional ties to the backend
- *This alows for better API functionality and less coding in the future when new features want to be added*

4. LDAP tie in to Engineering account emails *_(Leave for last)_*
- Create a new authentication system to tie accounts directly to the engr.colostate.edu domain
- Major updates/communications/forums will be communicated through email (or slack?)
- Tie them to original GP policies for permissions (maybe?), or through a certralized role system 

Always: A ton of documentation... (needed for the app and the internship sake)!!!!!
- There is next to none, I want to come up with proer UML diagrams and class systems for each functional piece of the app
- Needed for the sake of cleaning up code on my end, and maintaining a fluid system to be designed