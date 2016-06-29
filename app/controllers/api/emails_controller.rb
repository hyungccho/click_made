class Api::EmailsController < ApplicationController
  def index
  end

  def create
    @email = Email.new(email_params)

    if @email.save
      render status: 200, json: @email.to_json
    else
      render status: 422
    end
  end

  private

  def email_params
    params.require(:email).permit(:address)
  end
end