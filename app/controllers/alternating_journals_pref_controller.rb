# frozen_string_literal: true

class AlternatingJournalsPrefController < ApplicationController
  before_action :require_login

  def update
    color = params[:color].to_s.strip

    unless color.match?(/\A#[0-9a-fA-F]{6}\z/)
      render json: { ok: false, error: 'invalid color' }, status: :unprocessable_entity
      return
    end

    pref = User.current.pref
    pref['alternating_journal_color'] = color
    pref.save!

    render json: { ok: true }
  rescue StandardError => e
    render json: { ok: false, error: e.message }, status: :internal_server_error
  end
end
