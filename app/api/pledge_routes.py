from flask import Blueprint, redirect,session, request
from flask_login import login_required, current_user
from app.models import db, Pledge, Project
from app.forms import PledgeForm, ChoosePledgeForm

pledge_routes = Blueprint('pledge', __name__)

def validation_errors_to_error_messages(validation_errors):
  """
  Simple function that turns the WTForms validation errors into a simple list
  """
  errorMessages = []
  for field in validation_errors:
    for error in validation_errors[field]:
      errorMessages.append(f'{error}')
  return errorMessages


@pledge_routes.route('/')
def get_all_pledges():
  """
  Query for all pledges and return them in a list of project dictionaries
  """
  pledges = Pledge.query.all()
  return {"pledges": [pledge.to_dict() for pledge in pledges]}


@pledge_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_pledge(id):
  """
  Update pledge and return that pledge in a dictionary
  """
  thisPledge = Pledge.query.get(id)
  # thisProjectImage = ProjectImages.query.get(thisProject.project_images[0].id)
  form = PledgeForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if not thisPledge:
    return {"Error": "Pledge not Found"}, 404

  if form.validate_on_submit():
    thisPledge.pledge_name = form.data['pledge_name']
    thisPledge.price = form.data['price']
    thisPledge.ships_to = form.data['ships_to']
    thisPledge.rewards = form.data['rewards']
    thisPledge.estimated_delivery = form.data['estimated_delivery']

    db.session.commit()

    return thisPledge.to_dict(), 200
  if form.errors:
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400


@pledge_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_pledge(id):
  """
  Delete pledge
  """
  thisPledge = Pledge.query.get(id)

  if not thisPledge:
    return {"Error": "Pledge not Found"}, 404

  db.session.delete(thisPledge)
  db.session.commit()

  return {'Message': 'The pledge has been deleted!'}, 200


@pledge_routes.route('/<int:id>/choice', methods=["POST"])
@login_required
def choose_pledge(id):
  """
  Add pledge to user and add user to pledge
  """
  thisPledge = Pledge.query.get(id)
  thisProject = Project.query.get(thisPledge.project_id)

  form = ChoosePledgeForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    current_user.pledges.append(thisPledge)
    thisPledge.users.append(current_user)
    thisProject.backers += 1
    thisProject.current_fund += thisPledge.price

    db.session.commit()
    return thisPledge.to_dict(), 200
  if form.errors:
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400
