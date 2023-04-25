# LabelingWhenApproved


```
name: Labeling when approved PR

on:
  pull_request_review:
    types: [submitted]

jobs:
  add-approve-label:
    runs-on: [ self-hosted ]
    steps:
      - uses: actions/checkout@v2
      - name: Add APPROVE label
        uses: Dev-MJ/LabelingWhenApproved@main
        with:
          github-token: ${{ secrets.PERSONAL_ACCESS_TOKEN }}
          approves-number: 1 # set the required number of reviewers for your PR
          label-name: "APPROVED"
      
```