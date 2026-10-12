export type ExamQuestion = {
  question: string
  choices: string[]
  answer: number
  explanation: string
}

const exams: Record<string, ExamQuestion[]> = {
  'html-fundamentals': [
    { question: 'Which element should contain the unique primary content of a page?', choices: ['<main>', '<head>', '<meta>'], answer: 0, explanation: '<main> is the page’s primary content landmark.' },
    { question: 'What is the purpose of the lang attribute on html?', choices: ['Set the page background language color', 'Identify the document language for tools and assistive technology', 'Load a translation automatically'], answer: 1, explanation: 'lang communicates the language; it does not translate content.' },
    { question: 'When should you use an ordered list?', choices: ['When item order or sequence matters', 'For every group of links', 'To create columns'], answer: 0, explanation: 'Use ol when reordering the items changes their meaning.' },
    { question: 'Which pair associates a visible label with an input?', choices: ['label for="email" and input id="email"', 'label name="email" and input class="email"', 'placeholder and title'], answer: 0, explanation: 'The label’s for value must match the control id.' },
    { question: 'Which attribute identifies the key included in submitted form data?', choices: ['id', 'name', 'aria-label'], answer: 1, explanation: 'The name attribute identifies submitted form data; id connects labels and references.' },
    { question: 'Which image alternative is most appropriate for a decorative flourish?', choices: ['A long visual description', 'An empty alt value', 'Omit alt and title'], answer: 1, explanation: 'alt="" tells assistive technology to ignore purely decorative imagery.' },
  ],
  'css-responsive-design': [
    { question: 'Which selector usually gives the most reusable component style?', choices: ['A class selector', 'A long chain of element selectors', 'An inline style on every node'], answer: 0, explanation: 'Classes let the same component style be reused without high specificity.' },
    { question: 'Which property adds space between content and its border?', choices: ['margin', 'padding', 'outline'], answer: 1, explanation: 'Padding is inside the border; margin is outside it.' },
    { question: 'Which tool is naturally two-dimensional?', choices: ['Flexbox', 'Grid', 'Float'], answer: 1, explanation: 'Grid manages rows and columns together.' },
    { question: 'What does minmax(15rem, 1fr) express in a grid track?', choices: ['A 15rem minimum with flexible available space', 'A fixed 15rem track', 'A 15rem gap'], answer: 0, explanation: 'minmax sets a minimum and maximum sizing range for the track.' },
    { question: 'Why use :focus-visible on controls?', choices: ['To show a focus indicator for keyboard navigation', 'To hide controls until hovered', 'To remove all outlines'], answer: 0, explanation: 'A visible focus state helps keyboard users track their position.' },
    { question: 'What should determine a responsive breakpoint?', choices: ['When the content no longer fits comfortably', 'A single device brand’s screen size', 'Every 100 pixels'], answer: 0, explanation: 'Content-driven breakpoints work across device sizes.' },
  ],
  'javascript-fundamentals': [
    { question: 'What does const prevent?', choices: ['Changing properties inside an object', 'Reassigning the binding to a new value', 'Calling a function'], answer: 1, explanation: 'const prevents rebinding; contained objects may still be mutable.' },
    { question: 'What does a function parameter represent?', choices: ['A named input to a function', 'The function’s output only', 'A browser event always'], answer: 0, explanation: 'Parameters name values that callers can pass as arguments.' },
    { question: 'What does filter() return?', choices: ['A new array of items passing a test', 'The first matching item', 'A number of matches'], answer: 0, explanation: 'filter returns an array containing all items whose callback is truthy.' },
    { question: 'What is the safest common way to insert untrusted text into an element?', choices: ['innerHTML', 'textContent', 'document.write'], answer: 1, explanation: 'textContent inserts text without parsing it as markup.' },
    { question: 'What does querySelector return if no element matches?', choices: ['An empty array', 'null', 'The document body'], answer: 1, explanation: 'Handle null before calling methods on a missing selection.' },
    { question: 'Why call preventDefault() in a handled form submit listener?', choices: ['To stop the browser’s normal navigation/reload', 'To validate all fields automatically', 'To disable JavaScript'], answer: 0, explanation: 'It cancels the native action so the application can handle submission.' },
  ],
  'git-github': [
    { question: 'What is the Git staging area for?', choices: ['Selecting changes for the next commit', 'Hosting a website', 'Storing passwords'], answer: 0, explanation: 'git add places selected changes in the index for a commit.' },
    { question: 'What is a branch useful for?', choices: ['Isolating focused work from another line of development', 'Replacing every commit', 'Making code execute faster'], answer: 0, explanation: 'A branch lets work proceed independently before merging.' },
    { question: 'What does git fetch do?', choices: ['Downloads remote history without integrating it', 'Deletes local commits', 'Publishes the current folder as a site'], answer: 0, explanation: 'fetch retrieves remote refs; pull fetches and then integrates.' },
    { question: 'How should a developer respond to an accidentally committed API key?', choices: ['Revoke/rotate it immediately', 'Rename the variable only', 'Make the repo private and keep the key'], answer: 0, explanation: 'Assume it is compromised; rotate at the provider and remove it from code/history as appropriate.' },
    { question: 'What should you inspect before an undo command that discards changes?', choices: ['git status and the relevant diff', 'Only the branch name', 'The README word count'], answer: 0, explanation: 'Reviewing affected work prevents losing changes you intended to keep.' },
    { question: 'What is a pull request primarily for?', choices: ['Reviewing and discussing proposed changes before integration', 'Downloading Git', 'Replacing a remote repository'], answer: 0, explanation: 'A pull request presents a proposed branch change for review and checks.' },
  ],
  'react-development': [
    { question: 'What are props?', choices: ['Inputs passed into a component', 'A replacement for HTML', 'Browser storage'], answer: 0, explanation: 'Props let a parent configure a child component.' },
    { question: 'What should a component do when state changes?', choices: ['Let React render the updated UI', 'Manually rewrite arbitrary DOM nodes', 'Reload the browser for every change'], answer: 0, explanation: 'State setters schedule rendering from the new state.' },
    { question: 'Why should dynamic lists use stable keys?', choices: ['To help React match items between renders', 'To encrypt list data', 'To sort the items'], answer: 0, explanation: 'Stable keys preserve item identity when collections change.' },
    { question: 'What is a controlled input?', choices: ['An input whose value is driven by React state', 'An input that cannot be focused', 'An input with a placeholder only'], answer: 0, explanation: 'The value prop reflects state and an event handler updates it.' },
    { question: 'When is an effect appropriate?', choices: ['Synchronizing with an external system', 'Calculating any derived value', 'Replacing props'], answer: 0, explanation: 'Effects synchronize with systems outside React.' },
    { question: 'Why cancel an obsolete request in an effect cleanup?', choices: ['To prevent stale results and unnecessary work', 'To make every API succeed', 'To bypass CORS'], answer: 0, explanation: 'A late response should not overwrite data for a newer view.' },
  ],
  'apis-fetch': [
    { question: 'Does fetch reject automatically for an HTTP 404 response?', choices: ['Yes, all non-2xx codes reject', 'No, check response.ok/status', 'Only if the body is JSON'], answer: 1, explanation: 'HTTP failures still resolve to a Response; network failures reject.' },
    { question: 'What does response.json() do?', choices: ['Parses the response body as JSON asynchronously', 'Checks the HTTP status', 'Adds a JSON header to the request'], answer: 0, explanation: 'Check response.ok before parsing successful data.' },
    { question: 'Which states should a data-driven view represent?', choices: ['Loading, success/empty, and error', 'Success only', 'Error only'], answer: 0, explanation: 'Explicit states tell people what the request is doing and what happened.' },
    { question: 'Why use URLSearchParams?', choices: ['To encode and build query parameters safely', 'To hide a URL from the browser', 'To authenticate automatically'], answer: 0, explanation: 'It handles query formatting and encoding.' },
    { question: 'Can frontend JavaScript override a server’s CORS policy?', choices: ['Yes, with a fetch flag', 'No, the server must permit the origin', 'Only with POST'], answer: 1, explanation: 'The API server’s response headers control browser cross-origin access.' },
    { question: 'What should happen when a search request is replaced by a newer one?', choices: ['Cancel or ignore the outdated request', 'Show the older result last regardless', 'Disable all feedback'], answer: 0, explanation: 'Ignoring stale responses prevents outdated results replacing current ones.' },
  ],
  'website-deployment': [
    { question: 'What does a Vite production build produce?', choices: ['Optimized static files for the host', 'A permanent public URL by itself', 'A Git repository'], answer: 0, explanation: 'The build output is a static bundle, commonly in dist/.' },
    { question: 'Why test a production preview?', choices: ['Development and production paths can behave differently', 'It uploads your account automatically', 'It removes the need for accessibility checks'], answer: 0, explanation: 'Previewing can reveal missing paths and bundling issues before release.' },
    { question: 'Why does a client-side router need a static-host fallback?', choices: ['Direct nested URLs must serve the app entry point', 'It converts CSS to HTML', 'It stores progress in the cloud'], answer: 0, explanation: 'The fallback lets the client router render a deep route after index.html loads.' },
    { question: 'What is HTTPS for?', choices: ['Encrypting traffic and authenticating the site connection', 'Compressing every image automatically', 'Replacing DNS'], answer: 0, explanation: 'HTTPS protects data in transit and verifies the host identity.' },
    { question: 'Why optimize images before launch?', choices: ['Large assets increase transfer time', 'It adds accessible labels automatically', 'It removes the need for CSS'], answer: 0, explanation: 'Right-sized compressed assets improve load performance.' },
    { question: 'Why keep a known-good prior release?', choices: ['To restore service if a deployment breaks', 'To prevent every future bug', 'To skip testing'], answer: 0, explanation: 'A rollback restores service while a faulty release is investigated.' },
  ],
}

export function getCourseExamQuestions(courseSlug: string) {
  return exams[courseSlug] ?? []
}
