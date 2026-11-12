## Week 4 - SpendWise Dashboard Shell

For Week 4, I rebuilt the SpendWise Budget Tracker layout into a responsive dashboard shell using modern CSS techniques.

### Dashboard Structure

The dashboard contains:

- Sidebar navigation menu
- Dashboard header
- Budget summary section
- Six financial category cards
- Recent expenses table
- Footer

### CSS Grid

CSS Grid is used for the overall dashboard layout. The sidebar and main content are arranged into separate grid columns.

### Flexbox

Flexbox is used to arrange:

- Sidebar navigation items
- Header content
- Budget summary cards
- Category card content

### CSS Custom Properties

CSS variables were created inside `:root` for the application's theme, including:

- Brand color
- Accent color
- Surface/background color
- Primary text color
- Secondary text color
- Border color

### Responsive Design

A media query was added for screens below 768px. The dashboard changes to a single-column layout on smaller screens.

### Card Micro-interactions

The category cards include hover and keyboard focus effects using:

- `transform`
- `box-shadow`
- `transition`

The animation duration is 200ms.

### Dark Theme

As a stretch goal, a dark theme was added using:

```css
@media (prefers-color-scheme: dark)




