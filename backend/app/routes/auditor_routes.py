from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db, bcrypt
from app.models.credit import Credit
from app.models.transaction import PurchasedCredit, Transactions 
from app.models.user import User
import json
auditor_bp = Blueprint('auditor', __name__)
def get_current_user():
    try:
        return json.loads(get_jwt_identity())
    except json.JSONDecodeError:
        return None

@auditor_bp.route('/api/auditor/credits', methods=['GET'])
@jwt_required()
def manage_credits():
    current_user = get_current_user()
    if current_user.get('role') != 'auditor':
        return jsonify({"message": "Unauthorized"}), 403

    user = User.query.filter_by(username=current_user.get('username')).first()
    
    credits = Credit.query.filter(Credit.auditors.contains([user.id])).all()
    return jsonify([{
        "id": credit.id,
        "name": credit.name,
        "amount": credit.amount,
        "price": credit.price,
        "is_active": credit.is_active,
        "is_expired": credit.is_expired,
        "secure_url": credit.docu_url
    }for credit in credits]), 200
