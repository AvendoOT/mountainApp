package fer.hr.inverzni.security;

import fer.hr.inverzni.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Qualifier("userServiceImpl")
    @Autowired
    private UserService userDetailsService;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(10);
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .cors()
            .and()
            .csrf()
            .disable()
            .authorizeRequests()
            .antMatchers("/h2-console/**", "/actuator/health", "/api/register", "/api/trips/**")
            .permitAll()
            .anyRequest().authenticated()
            .and()
            .formLogin()
            .loginProcessingUrl("/api/login")
            .successHandler(((request, response, authentication) -> response.setStatus(200)))
            .failureHandler(((request, response, authentication) -> response.setStatus(401)))
            .and()
            .logout()
            .logoutUrl("/api/logout")
            .logoutSuccessHandler(((request, response, authentication) -> response.setStatus(200)))
            .deleteCookies("JSESSIONID", "remember-me")
            .invalidateHttpSession(true)
            .permitAll()
            .and()
            .rememberMe()
            .rememberMeParameter("rememberMe")
            .key("uniqueAndSecret") // validity default 2 weeks
            .and()
            .headers().frameOptions().disable();
    }

    protected void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {

        auth
            .userDetailsService(userDetailsService)
            .passwordEncoder(passwordEncoder());
    }

}
