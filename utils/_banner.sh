#!/bin/bash
#
# Print banner art.

#######################################
# Print a board. 
# Globals:
#   BG_BROWN
#   NC
#   WHITE
#   CYAN_LIGHT
#   RED
#   GREEN
#   YELLOW
# Arguments:
#   None
#######################################
print_banner() {
  clear


printf "${GREEN}";
printf "╔══════════════════════════════════════════════════════════════════════════════╗\n";
printf "║                                                                              ║\n";
printf "║                            ZAPCONVERSE                                       ║\n";
printf "║                     Sistema de Atendimento                                   ║\n";
printf "║                                                                              ║\n";
printf "╚══════════════════════════════════════════════════════════════════════════════╝\n";

printf "${NC}"
printf "\n"

printf "Solicite suporte: https://zapconverse.com/suporte\n"
printf "2025 @ Todos os direitos reservados a Zapconverse\n"



  printf "${NC}";

  printf "\n"
}
