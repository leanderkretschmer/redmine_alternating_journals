# frozen_string_literal: true

module AlternatingJournals
  class Hooks < Redmine::Hook::ViewListener
    def view_layouts_base_html_head(context = {})
      controller = context[:controller]
      return unless controller.is_a?(IssuesController) && controller.action_name == 'show'

      stylesheet_link_tag('alternating_journals', plugin: 'redmine_alternating_journals') +
      javascript_include_tag('alternating_journals', plugin: 'redmine_alternating_journals')
    end
  end
end
