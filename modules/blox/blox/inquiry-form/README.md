# Inquiry Form block (Menashe Forge)

A request form (quote, booking, contact) whose fields are listed in the
block's `content`. It posts JSON to `/api/inquiry`, the site's Worker from
hugo-shared, which emails the owner one message laid out like the form:
setup, the request format and the email: `hugo-shared/README.md`, "Inquiry form".
Without that Worker, set `preview: true`.

## Usage

```yaml
- block: inquiry-form
  id: inquiry            # anchor for "#inquiry" links
  content:
    title: "Get a quote"           # optional
    subtitle: "…"                  # optional
    subject: "New quote request"   # email subject and heading; the visitor's name is appended
    fields:
      - label: "Full name"         # shown, and the email's label; the first field should be the name
        type: text                 # text | tel | email | date | number | select | textarea
        required: true
        width: half                # full (default) | half | third; also the email's cell width
      - label: "Phone"
        type: tel                  # in the email: call + WhatsApp links
        required: true
        width: half
      - label: "Trip type"
        type: select
        options: ["Round trip", "One way"]
      - heading: "Passengers"      # a group heading between fields (form only, not in the email)
      - label: "Adults"
        type: number
        default: 1                 # also: placeholder
        min: 1
        max: 9
        width: third
    # Optional overrides of the interface text (else i18n block_inquiry_form_*):
    # submit, sending, success, error, required_note, preview_note,
    # review_button, review_title, review_note, edit, sent_title, ref_label,
    # error_required, error_min, error_max, error_min_date, error_max_date,
    # error_minlength, error_email, error_format, done_text
    # done_url: "/"              # review mode: the confirmation's closing link (default: the home page)
    # preview: true              # submit disabled, "coming soon" note: before the Worker is set up
    # review: true               # check-answers step before sending, then a confirmation (below)
    # title_level: 1             # the title as the page's h1, for a page of its own (default 2)
```

A field labeled with `type: email` becomes the email's reply-to. Content may
also come from `data/blocks/<ref>.yaml` with `ref:`.

## Review mode (`review: true`)

For visitors' confidence that the request arrived (the GOV.UK "check answers"
and "confirmation page" patterns). Three views, one at a time, on the same page:

1. **Form**: the button reads `review_button`; the browser's own validation runs.
2. **Check answers**: the filled fields as label/value (empty ones left out),
   `review_note` says nothing was sent yet; `submit` sends, `edit` (or the
   browser's Back) returns to the form with every answer kept. A failed send
   stays here with the `error` text.
3. **Sent**: `sent_title`, the Worker's `ref` (also in the email subject, so
   owner and visitor can name the request), `success` as the "what happens
   next" line, the answers again, and a closing link (`done_text`, to
   `done_url`, default the home page). Other pages need no such link: the
   header (logo, menu) is the way home everywhere.

Focus moves to each view's heading. Nothing is stored: a reload starts over.

## Checks

The browser's own validation, configured per field with the standard HTML
attributes, passed through as written: `required`, `min`, `max`, `step`,
`minlength`, `maxlength`, `pattern` (and the `type`: `email`, `number`, `date`).
Three additions:

```yaml
      - label: "Departure date"
        type: date
        min: today                 # the visitor's today
      - label: "Return date"
        type: date
        min_field: "Departure date"  # not before that field's value (when it has one)
      - label: "Infants"
        type: number
        max_field: "Adults"        # max_field: not more than that field's value
      - label: "Phone"
        type: tel
        pattern: '\+?[0-9 \-]{9,20}'  # single quotes: no YAML escaping; browsers apply the regex's v flag (escape - ( ) [ ] { } | / in classes)
        error: "Digits only, e.g. 050-1234567"  # replaces every message but "required"
```

On submit, each failing field gets a message below it (`aria-invalid`,
`aria-describedby`) and the first one gets focus; nothing is sent. Marked
fields are re-checked as the visitor types. Messages: `error_*` in the
interface text or the field's `error:`; `{name}` is the field's attribute of
that name, e.g. `{min}`, `{max}`, `{placeholder}` (dates in the page's
format), so a message never repeats a value the YAML already holds. A new rule = an attribute in the YAML; a new message = a
branch in `message()` plus an `error_*` key.

These checks are for the visitor. The Worker only caps lengths and field
count: a request that skips the form can still send odd values, which costs
one odd email.

## Notes

- One code path for both directions: `tel`/`email` inputs are `dir="ltr"` but
  align with the form's start edge (`rtl:text-right`).
- A hidden `botcheck` checkbox is the honeypot; the Worker drops submissions
  that tick it.
- Interface text: `i18n/{en,he}.yaml` (`block_inquiry_form_*`), English in the
  template as the last fallback.
