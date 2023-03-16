import pytest

import requests

def get_search_points_title(keywords, job_title):
    """
    Takes in a list of keywords and the job title and returns the total search points for the title
    """
    search_points = 0
    for keyword in keywords:
        if keyword.lower() in job_title.lower():
            search_points += 2

    return search_points

def get_search_points_description(keywords, job_description):
    """
    Takes in a list of keywords and the job description and returns the total search points for the description
    """
    search_points = 0
    for keyword in keywords:
        if keyword.lower() in job_description.lower():
            search_points += 1

    return search_points

def get_total_search_points(json_response, keywords):
    """
    Takes a json response and returns a list of tuples each containing the job id and the associated search points
    """
    total_points = list()
    for job in json_response:
        title_points = get_search_points_title(keywords, job['title'])
        description_points = get_search_points_description(keywords, job['description'])
        total_points.append((job['id'], title_points + description_points))
    return total_points

def are_results_in_descending_order(total_search_points):
    """
    Takes a list of tuples containg the id of a job and the search points associated to the job and
    returns whether it is in descending order based on the search points (higher search points means more relevant result)
    """
    points_in_descending_order = True
    for index, job_points in enumerate(total_search_points):
        if index == len(total_search_points) - 1:
            break

        next_job_points = total_search_points[index + 1][1]
        if job_points[1] < next_job_points:
            points_in_descending_order = False
            break
    
    return points_in_descending_order

class TestSearchAlgorithm:

    user_search = "Software Developer Engineer Machine"
    endpoint = '/api/v1/jobs/?search={user_search}'.format(user_search=user_search)

    @pytest.mark.django_db
    def test_descending_order(self, client, job1, job2):
        response = client.get(self.endpoint)
        assert response.status_code == 200

        response_json = response.json()
        assert response_json != None
        keywords = self.user_search.split("%20")
        job_id_search_points = get_total_search_points(response_json, keywords)
        assert job_id_search_points != 1

        descending_order = are_results_in_descending_order(job_id_search_points)
        assert descending_order == True