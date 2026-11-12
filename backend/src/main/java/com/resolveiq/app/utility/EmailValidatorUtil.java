package com.resolveiq.app.utility;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

//Email validator
@Component
public class EmailValidatorUtil {

        @Value("${college.email.domain}")
        private String allowedDomain;

        public void validateCollegeEmail(String email) {

            if (email == null || !email.endsWith(allowedDomain)) {
                throw new IllegalArgumentException(
                        "Email must end with " + allowedDomain
                );
            }
    }
}
