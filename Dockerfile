FROM node:10
COPY ./ ./
RUN npm install
EXPOSE 3000
ENV AURL=lms.cci0zvagpate.us-east-1.rds.amazonaws.com ADB=library AUN=admin APASS=AWejFnTqjHhK4ObdPKG4
ENTRYPOINT ["node","main.js"]