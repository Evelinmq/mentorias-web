create table if not exists carrera
(
    id     int auto_increment
        primary key,
    nombre varchar(50) not null,
    constraint id
        unique (id)
);

create table if not exists edificio
(
    id     int auto_increment
        primary key,
    nombre varchar(50) not null,
    constraint id
        unique (id)
);

create table if not exists espacio
(
    id         int auto_increment
        primary key,
    nombre     varchar(50) not null,
    edificioID int         not null,
    constraint id
        unique (id),
    constraint fk_edificio_espacio
        foreign key (edificioID) references edificio (id)
);

create table if not exists estadomentoria
(
    id     int auto_increment
        primary key,
    nombre varchar(20) not null,
    constraint id
        unique (id)
);

create table if not exists estadousuario
(
    id     int auto_increment
        primary key,
    nombre varchar(20) not null,
    constraint id
        unique (id)
);

create table if not exists materia
(
    id           int auto_increment
        primary key,
    nombre       varchar(50) not null,
    cuatrimestre int         not null,
    carreraID    int         not null,
    constraint id
        unique (id),
    constraint fk_carrera_materia
        foreign key (carreraID) references carrera (id)
);

create table if not exists rol
(
    id     int auto_increment
        primary key,
    nombre varchar(20) not null,
    constraint id
        unique (id)
);

create table if not exists usuario
(
    id          int auto_increment
        primary key,
    nombre      varchar(100) not null,
    apellidos   varchar(100) not null,
    correo      varchar(30)  not null,
    contraseña  varchar(300) not null,
    foto_perfil varchar(255) null,
    estadoID    int          not null,
    carreraID   int          null,
    constraint correo
        unique (correo),
    constraint id
        unique (id),
    constraint fk_carrera_usuario
        foreign key (carreraID) references carrera (id),
    constraint fk_estado_usuario
        foreign key (estadoID) references estadousuario (id)
);

create table if not exists mentoria
(
    id           int auto_increment
        primary key,
    fecha        date not null,
    horaInicio   time not null,
    horaFin      time not null,
    cuatrimestre int  not null,
    espacioID    int  not null,
    estadoID     int  not null,
    mentorID     int  not null,
    materiaID    int  not null,
    constraint id
        unique (id),
    constraint fk_espacio_mentoria
        foreign key (espacioID) references espacio (id),
    constraint fk_estado_mentoria
        foreign key (estadoID) references estadomentoria (id),
    constraint fk_materia_mentoria
        foreign key (materiaID) references materia (id),
    constraint fk_mentor_mentoria
        foreign key (mentorID) references usuario (id)
);

create table if not exists mentoriausuario
(
    usuarioID       int not null,
    mentoriaID      int not null,
    estadoSolicitud int not null,
    primary key (usuarioID, mentoriaID),
    constraint fk_mentoriaInUsuario
        foreign key (mentoriaID) references mentoria (id),
    constraint fk_usuarioHasMentoria
        foreign key (usuarioID) references usuario (id)
);

create table if not exists tema
(
    id         int auto_increment
        primary key,
    nombre     varchar(50) not null,
    mentoriaID int         not null,
    constraint id
        unique (id),
    constraint fk_mentoria_tema
        foreign key (mentoriaID) references mentoria (id)
);

create table if not exists usuariorol
(
    usuarioID int not null,
    rolID     int not null,
    primary key (usuarioID, rolID),
    constraint fk_rolInUsuario
        foreign key (rolID) references rol (id),
    constraint fk_usuarioHasRol
        foreign key (usuarioID) references usuario (id)
);


