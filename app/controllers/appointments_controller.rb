class AppointmentsController < ApplicationController
  def index
    # For the list
    @appointments = Appointment.order(:start_time).select(:id, :title, :start_time)

    # For the form
    @appointment = Appointment.new
  end

  def show
    @appointment = Appointment.find(params[:id])
  end

  def create
    @appointment = Appointment.new(appointment_params)
    if @appointment.save
      render json: @appointment
    else
      render json: @appointment.errors, status: :unprocessable_entity
    end
  end

  private

  def appointment_params
    params.require(:appointment).permit(:title, :start_time)
  end
end
