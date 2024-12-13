# Andara Imperial Terrace

An oase Andara's application that will handle the processws of sales, rent of property, tender and also tour package features as well.

## About Andara Imperial Terrace Application

### Sales Property

Andara Imperial Terrace is your ultimate platform for seamless property sales and management. Designed to revolutionize the real estate market, it combines cutting-edge technology with strategic features to ensure properties reach their maximum sales potential.

Get ready to redefine property transactions. Join Andara Imperial Terrace today!

Key Features:
 - Efficient Property Sales
With a user-friendly interface and streamlined processes, buyers and sellers can easily connect, facilitating faster and more transparent transactions.

- Agent Affiliate Program, Expand your sales force effortlessly with our innovative agent affiliate feature.
Agents can register, promote properties, and earn competitive commissions.
This program empowers a network of affiliates to boost property visibility and drive sales.
Comprehensive Listings. Our platform hosts an extensive portfolio of properties, ensuring diverse options for buyers while maximizing exposure for sellers.

With Andara Imperial Terrace, we’re not just facilitating property sales; we’re creating opportunities for growth, innovation, and success in the real estate market. Whether you’re a seasoned professional or a new agent, this is your gateway to thriving in property sales.

Andara Imperial Terrace is your one-stop solution for handling property tenders, ensuring a smooth collaboration between property owners and constructors.

### Tender

Andara Imperial Terrace also become revolutionize the property tender process for constructors. This innovative application provides a seamless, efficient, and transparent workflow, encompassing every step from registration to tender management.

Key Features:
- Registration: Constructors can easily sign up and create a comprehensive profile that includes their credentials, certifications, and previous project portfolios.

- Verification: A robust verification system ensures that all applicants meet the required standards and criteria before participating in the tender process.

- Tender Management: The platform offers tools for managing tenders, including:

  - Publishing property tender details.
  - Allowing constructors to submit bids.
  - Providing analytics for decision-making.
  - Facilitating secure communication between stakeholders.

### Rent of Villa

Discover the pinnacle of elegance and indulgence at Andara Imperial Terrace, your ultimate destination for experiencing luxurious European villa-style living. Nestled amidst breathtaking European-inspired panoramas, we provide a haven of sophistication where every moment is tailored to perfection.

Services We Offer:
- Rooftop BBQ Delights: Savor unforgettable evenings under the stars with premium BBQ selections prepared atop our scenic rooftop terrace.
- Sushi Time: Experience authentic and exquisite sushi creations, blending tradition and modern flair, served fresh daily.
- Horsery Adventures: Embrace the thrill of equestrian activities, from guided rides to immersive horseback experiences for all skill levels.
- Archery Excellence: Unleash your inner marksman with our professional archery setups, designed for fun and precision.
- Panoramic European Views: Be enchanted by landscapes reminiscent of Europe’s finest destinations, a perfect backdrop for relaxation or memorable photos.
Whether you’re seeking a serene escape, a romantic getaway, or simply a unique retreat, Andara Imperial Terrace promises an unparalleled experience that blends leisure, luxury, and lifestyle.

Welcome to your European-inspired sanctuary.

### Tour Package

We are dedicated to crafting an Oasis Experience—a rejuvenating journey designed to boost your soul with positive energy. Whether you're exploring the cultural richness of Solo or seeking a serene escape, our tour packages guarantee the perfect blend of relaxation and adventure.

To ensure your comfort, we offer exclusive accommodation in our luxurious European-style villas, providing a unique and charming place to stay, complete with modern amenities and elegant designs that transport you to a world of sophistication.

At Andara Imperial Terrace, we aim to deliver not just tours but unforgettable experiences that leave you feeling refreshed and inspired. Come and let us guide you through the wonders of Solo Raya!

## Framework Used

This is a [React.js].

## Getting Started

## Scripts

- `npm run dev-sass`: run this is you are making changes to any files inside `src/assets`
- `npm run compile-sass`: compiles `src/assets/scss/index.scss` into `src/assets/css/index.min.css`

### Notes on `sass` options

####  `--load-path`

We need to tell sass where to find the style files, especially for bootstrap.

`--load-path=<path-to-bootstrap> <path to main index.scss file> <output path to index.css>`

#### `--source-map-urls`

Need to set to absolute, otherwise we will get `unknown url scheme webpack` for the source files in dev tools
## Folder Structure

This project uses Atomic Design to structure our folders.

We have two main folders:

- /components
- /domains

## `/components`

Only for UI/display-type components.

They have no coupling to any specific domain/resource.

## `/components Structure`

- atoms
- molecules
- organisms
- pages
- services

## domains

1st level nest maps to the resources we interact with

Resources are like:

- admin
- customer

### domains/<resource>

2nd level nest is the atomic structure

- atoms
- molecules
- organisms
- pages


### domains/<resource>/services

Services is an POJO that contains keys that return functions.

Typically used when:

1. Fetch data from Backend
2. Need to transform/manipulate data
3. Instead of having it in the page, we can move it out into another file

Rules for functions:

1. No UI side effects
2. Takes in data, and returns data
3. Does not set any state or take in function references from the page.

## Key Components

- `DataTable`
- `<Resource>DataTable`
 - examples
  - src/domains/seller-inbound/organisms/receive-table/seller-inbound-receive-table.jsx
- `Input<Variant>Field`
- `ReactSelectSearchField` vs `SelectSearchField` vs `ReactMultiSearchField`

# Routes

- Array of Objects that define the components we can navigate to.

## API Service Convention

- QueryParamsUtil.format(tableState, additionalFilters)

### Form Rules

- Formik `initialValues` same or as close as possible as what the endpoint accepts.

- Always set the validation errors from backend to formik if available (i.e. ValidationError)

- We display `errors.response.data.messages.base` inside the `GenericErrorApiAlert`

### Note on async with formik

Your handleSubmit function must be async.

```js

const SomePage =() => {

  const [baseErrors, setBaseErrors] = useState(undefined)

  // needs to be async and we await the endpoint call inside
  const handleSubmitForm = async (formikValues, formikActions) => {
    await SomeApiEndpoint.post(formikValues)
    .then((response) => {
      // handle the response.data
      // optionally formikActions.resetForm() if user remains on the same page.
    })
    .catch((error) => {
      // set formik errors so fields get updated with error msgs.
      const apiError = errors.response.data
      formikActions.setErrors(apiError.messages)
      // optionally - We display `errors.response.data.messages.base` inside the `GenericErrorApiAlert`
      const baseError = ErrorApiV2Util.getGenericMessage(error)
      if (baseError) setBaseError(
        <GenericErrorApiAlert messages={apiError.messages.base}/>
      )
    })
  }

  return (
    { baseErrors }
    <SomeCreateForm
      handleSubmit={handleSubmitForm}
    />
  )

}

```

## General Rule of Thumb on Creating Pages

- Each page does only 1 thing
- For each process, we ask what we start off displaying

For example:

I want process a Customer Order Refund Request.

What do I start off displaying?

- I display a table of Customer Order Refund Request
- Is this table already implemented?
  - I will display all the columsn and decide later using `hidden` columns what columns are not relevant to the page that will be using the `<Resource>Table`.

- When user clicks on a row, I will navigate to another page.
