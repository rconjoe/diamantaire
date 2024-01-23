# How to run artillery test:

## Run locally:

    artillery run api-load-test.yml          
    artillery run -o perf-test-result.json api-load-test.yml 

## Run on AWS fargate:
1) Get AWS credential from devops (Stephane)
2) Run

        AWS_PROFILE=mfa AWS_SDK_LOAD_CONFIG=1  artillery run-fargate --region us-west-1 --count 15  -o result-output.json ui-load-test.yml          
3) To generate HTML report, run

        artillery report result-output.json


# Key Metrics
A few important metrics to look for :
https://web.dev/articles/fid


**Largest Contentful Paint (LCP)**: measures loading performance. To provide a good user experience, LCP should occur within 2.5 seconds of when the page first starts loading.

**First Input Delay (FID)**: measures interactivity. To provide a good user experience, pages should have a FID of 100 milliseconds or less.

**Cumulative Layout Shift (CLS)**: measures visual stability. To provide a good user experience, pages should maintain a CLS of 0.1. or less.

## Future Todo:
1) Integrate load test into CICD - etup github action to run on periodically https://www.artillery.io/docs/cicd/github-actions
2) Setup external monitoring and observability systems  (AWS Cloudwatch / Datadog and etc)
3) Use weight to improve soak test
4) Add more workflows to ui-load-test