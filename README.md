# VolunCheers FE

# Description

VolunCheers is an easy-to-use system that engages, tracks, and manages volunteers in service to their communities. User easily post and apply for a job or leave a question about what they want to know more about that job. They can see a list of jobs that they have posted attached with the job’s candidate list. User can update their profile and manage their application.

# Feature (User Story)

## authentication

1. New User can register for a new account with name, email, password.
2. User have to log in with email and password
3. User stay logged in with refreshing page
4. On the profile page, user can see: name , avatar, about me
5. User can switch tabs between
   1. update profile: can edit all information (including password)
   2. Jobs: list of job which user created + filter by name
   3. applications: list of application which user applied +filter by status "pending", "approved" , "rejected"

## Job

1. user can see homepage with carousel and some fearturing job
2. user can see list all of job: search, filter,pagination
3. user can click to see more detail about job and Q&A of job

## Create job

1. User can create a new job. User can see the detail job after successfully created
2. author can edit job
3. author can update job

## Q&A

1. User can take a question on a job detail page. User can see the comment after successfully created.
2. User can edit comment if author haven't replied yet
3. User can delete comment
4. Employer can answer each question. All user can see an answer after successfully created.

## respond request

1. user can apply job with message in page detail+manage application in account page
2. user can cancel application in page detail+ account page
3. employer can respond "approved" , "rejected" application
4. when approved, secret message will be appeared in application of candidate

## Map

1. User can search job by map
2. User can locate their browser to find job near them
3. User can locate click on job card and see its location

## Donation

1. user can donate by 2 gateways:MoMo, Paypal

## Theme

1. user can choose dark mode or light mode in header

## Stats

1. User can see the number of volunteer and job are available in homepage
2. user can click chart icon and see the bar chart of status application in first fifth month in 2022

# Link to demo

https://voluncheer.herokuapp.com/

# Link to API

https://voluncheer-api.herokuapp.com/

# mock demo account sign-in info.

ID: my.le@gmail.com
password: 12345a
