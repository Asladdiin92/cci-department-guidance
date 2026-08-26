### 4.1.2 Activity Model and Scoring Process Specification

#### A. Process Overview
Figure 4.2 presents the formal UML Activity Flowchart depicting the end-to-end execution lifecycle of the student assessment session, bidirectional navigation mechanics, scoring calculation pipeline, and post-assessment exploration states.

#### B. Activity Lifecycle Phases

1. **Session Initialization Phase**:
   - Resets cumulative score tallies for all five departments ($\text{CS}=0, \text{SWE}=0, \text{IT}=0, \text{IS}=0, \text{STAT}=0$).
   - Sets the question pointer index to $i = 0$ (Question 1) and initializes client memory.

2. **Interactive Question Execution Loop**:
   - Renders current question $i$ along with its category indicator and 4–5 selectable option cards.
   - Updates the progress bar proportionally: $\text{Progress} = \frac{i + 1}{20} \times 100\%$.
   - Enforces single-selection validation: selecting an option immediately persists the choice index and enables forward progression.
   - Supports **bidirectional navigation**: clicking "Previous" decrements $i \leftarrow i - 1$ while faithfully restoring the previously chosen option without data loss.

3. **Algorithmic Evaluation & Normalization Engine**:
   - Upon answering Question 20 ($i = 19$), the system executes the multi-criteria evaluation routine:
     $$\text{RawScore}_d = \sum_{i=1}^{20} P_{d, i} \quad \text{for } d \in \{\text{CS}, \text{SWE}, \text{IT}, \text{IS}, \text{STAT}\}$$
     $$\text{MatchScore}_d = \min\left(100, \text{round}\left(\frac{\text{RawScore}_d}{60} \times 100\right)\right)$$
   - Sorts departments in descending order of compatibility.
   - Maps rank badges (Gold for #1, Silver for #2, Bronze for #3), curriculum focus explanations, caution tags, and recommended course pathways.

4. **Results Presentation & Exploration Phase**:
   - Renders the primary **Results Screen** showing top recommendations and percentage match indicators.
   - Enables non-linear post-assessment actions:
     - **Side-by-Side Comparison**: Contrasts all 5 departments simultaneously across math intensity, coding depth, and job roles.
     - **Department Deep-Dive**: Opens specific departmental profiles.
     - **Assessment Reset**: Sanitizes state and returns user to Question 1.