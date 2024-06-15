# Configuration of Facets or Filters in Algolia

## Introduction
Algolia is a fast and powerful search solution that allows users to efficiently filter and search for products in your marketplace. "Facets" or filters in Algolia allow users to refine their searches based on specific product attributes, such as categories, brands, prices, etc.



## Requirements
Before setting up facets in Algolia, make sure you have:
- An Algolia account
- A product index configured in Algolia
- Algolia API keys configured in your project


## Configuration in Algolia Dashboard

1. **Login to Algolia**: Access your Algolia account and select the index you want to configure.
2. **Configure Facets**:
 - Go to the "Search then" "Indices" section and select the product index.
 - In the "Configuration" tab, look for the "Faceting" section.
 - Add the attributes you want to use as filters. For example, `categories`, `brand`, `price`, etc.
 - Check the attributes you want to use for faceting and save the changes.